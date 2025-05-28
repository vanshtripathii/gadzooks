fetch("/api/products")
  .then(response => response.json())
  .then(products => {
      const container = document.querySelector(".product-grid");
      container.innerHTML = products.map(product => `
          <div class="product-card">
              <img src="${product.image_url}" alt="${product.name}">
              <h3>${product.name}</h3>
              <p>Price: ₹${product.price}</p>
              <p>Size: ${product.size}</p>
          </div>
      `).join("");
  })
  .catch(error => console.error("Error loading products:", error));
