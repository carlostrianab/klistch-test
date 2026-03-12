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

        // Update cart drawer and header using jQuery section rendering
        this.updateCartDrawerWithJQuery();

        // Clear selected items after successful add
        this.selectedItems = [];
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    },
    async updateCartDrawerWithJQuery() {
      // Fetch cart drawer section and update .cart-items
      fetch("?section_id=cart-drawer")
        .then(response => response.text())
        .then(cartData => {
          var cart_html = $(cartData);
          var cart_items = $(".cart-items", cart_html);
          $(".cart-items").replaceWith(cart_items);
        });
      // Fetch header section and update .header-cart-count
      fetch("?section_id=header")
        .then(response => response.text())
        .then(headerData => {
          var cart_html = $(headerData);
          var cart_count = $(".header-cart-count", cart_html);
          $(".header-cart-count").replaceWith(cart_count);
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
