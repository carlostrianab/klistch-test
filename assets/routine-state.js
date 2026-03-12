document.addEventListener("alpine:init", () => {
  Alpine.data("RoutineBuilder", () => ({
    selectedItems: [],
    init() {
      // Find and bind the add-to-cart button
      const addToCartBtn = document.querySelector(".button-add-to-cart");
      if (addToCartBtn) {
        addToCartBtn.addEventListener("click", e => {
          console.log("Add to Cart button clicked!");
          console.log("Selected items:", this.selectedItems);

          // Add selected items to cart via AJAX
          if (this.selectedItems.length > 0) {
            e.preventDefault();
            this.addToCart();
          }
        });
      }
    },
    async addToCart() {
      const items = this.selectedItems.map(product => ({
        id: product.variant_id,
        quantity: 1
      }));

      console.log("Adding to cart:", items);

      try {
        const response = await fetch("/cart/add.js", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({ items })
        });

        if (!response.ok) {
          throw new Error(`Add to cart failed: ${response.status}`);
        }

        // Update cart drawer and header using regular JavaScript
        this.updateCartDrawerWithJQuery();

        // Clear selected items after successful add
        this.selectedItems = [];
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    },
    async updateCartDrawerWithJQuery() {
      // Fetch cart drawer section and update .cart-items
      fetch("?section_id=cart-drawer&preview_theme_id=183783358774")
        .then(response => response.text())
        .then(cartData => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(cartData, "text/html");
          const cartItems = doc.querySelector(".cart-items");
          const currentCartItems = document.querySelector(".cart-items");
          if (cartItems && currentCartItems) {
            currentCartItems.replaceWith(cartItems);
          }
        });
      // Fetch header section and update .cart-count-bubble
      fetch("?section_id=header&preview_theme_id=183783358774")
        .then(response => response.text())
        .then(headerData => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(headerData, "text/html");
          const cartBubble = doc.querySelector(".cart-count-bubble");
          const currentCartBubble = document.querySelector(".cart-count-bubble");
          if (cartBubble && currentCartBubble) {
            currentCartBubble.replaceWith(cartBubble);
          }
        });
    },
    toggleProduct(product) {
      const exists = this.selectedItems.find(i => i.id === product.id);
      if (exists) {
        this.selectedItems = this.selectedItems.filter(i => i.id !== product.id);
      } else {
        this.selectedItems.push(product);
      }
      console.log("Selected items:", this.selectedItems);
    }
  }));
});
