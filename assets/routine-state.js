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
          body: JSON.stringify({
            items,
            sections: "cart-count-bubble,cart-drawer",
            sections_url: window.location.pathname
          })
        });

        if (!response.ok) {
          throw new Error(`Add to cart failed: ${response.status}`);
        }

        const data = await response.json();

        console.log("Cart updated:", data);

        // Update cart count bubble using Section Rendering API
        this.updateCartCountBubble(data.sections["cart-count-bubble"]);
        // Update cart drawer content using Section Rendering API
        this.updateCartDrawer(data.sections["cart-drawer"]);

        // Clear selected items after successful add
        this.selectedItems = [];
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    },
    updateCartDrawer(sectionHtml) {
      if (!sectionHtml) return;

      const parser = new DOMParser();
      const doc = parser.parseFromString(sectionHtml, "text/html");

      const newDrawer = doc.querySelector(".cart__drawer-content");
      const currentDrawer = document.querySelector(".cart__drawer-content");

      if (newDrawer && currentDrawer) {
        currentDrawer.replaceWith(newDrawer);
      }
    },
    updateCartCountBubble(sectionHtml) {
      if (!sectionHtml) return;

      const parser = new DOMParser();
      const doc = parser.parseFromString(sectionHtml, "text/html");

      const newBubble = doc.querySelector(".cart-count-bubble");
      const currentBubble = document.querySelector(".cart-count-bubble");

      if (newBubble && currentBubble) {
        currentBubble.replaceWith(newBubble);
      }
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
