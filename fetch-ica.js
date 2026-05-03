import axios from 'axios';

// ICA GraphQL API
async function searchICAProduct(query) {
  try {
    console.log(`🔍 Searching ICA for: ${query}\n`);

    const response = await axios.post('https://handla.ica.se/graphql', {
      query: `
        query {
          search(term: "${query}") {
            products {
              name
              id
              brand
              price {
                value
                currency
              }
            }
          }
        }
      `
    }, {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Referer': 'https://handla.ica.se/'
      }
    });

    if (response.data?.data?.search?.products) {
      const products = response.data.data.search.products;
      console.log('✅ Found products:');
      console.log(JSON.stringify(products, null, 2));
      return products;
    } else {
      console.log('❌ No products found');
      return [];
    }

  } catch (error) {
    console.log('❌ GraphQL Error:', error.response?.data || error.message);
    return null;
  }
}

// Get product details by ID
async function getProductDetails(productId) {
  try {
    console.log(`\n📦 Fetching details for product: ${productId}`);
    
    const response = await axios.get(`https://handla.ica.se/api/product/${productId}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Accept': 'application/json'
      }
    });

    console.log('✅ Product details:');
    console.log(JSON.stringify(response.data, null, 2));
    return response.data;

  } catch (error) {
    console.log('❌ Error:', error.response?.status || error.message);
    return null;
  }
}

// Main function
async function main() {
  const searchTerm = process.argv[2] || 'mjölk';
  
  // Step 1: Search for products
  const products = await searchICAProduct(searchTerm);
  
  // Step 2: Get details for first product (if found)
  if (products && products.length > 0) {
    const firstProduct = products[0];
    console.log(`\n🎯 Getting details for: ${firstProduct.name} (ID: ${firstProduct.id})`);
    await getProductDetails(firstProduct.id);
  }
}

main();
