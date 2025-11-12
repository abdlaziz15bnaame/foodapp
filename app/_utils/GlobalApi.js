import { gql, GraphQLClient } from "graphql-request";

const MASTER_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const client = new GraphQLClient(MASTER_URL);

// ------------------ GET CATEGORY ------------------
const getCategory = async () => {
  try {
    const query = gql`
      query MyQuery {
        categories(first: 25) {
          id
          name
          icon {
            url
          }
        }
      }
    `;
    const result = await client.request(query);
    console.log("✅ Categories fetched successfully:", result);
    return result;
  } catch (error) {
    console.error("❌ Error fetching categories:", error);
    return null;
  }
};

// ------------------ GET RESTAURANTS ------------------
const getRestaurant = async (category) => {
  try {
    let query;
    if (category && category !== "Burger") {
      query = gql`
        query MyQuery {
          restaurants(where: { category_some: { name: "${category}" } }) {
            aboutUs
            address
            banner {
              url
            }
            id
            name
            restuarantType
            slug
            workingHours
            category {
              name
            }
          }
        }
      `;
    } else {
      query = gql`
        query MyQuery {
          restaurants {
            aboutUs
            address
            banner {
              url
            }
            id
            name
            restuarantType
            slug
            workingHours
            category {
              name
            }
          }
        }
      `;
    }

    const result = await client.request(query);
    console.log("✅ Restaurants fetched successfully:", result);
    return result;
  } catch (error) {
    console.error("❌ Error fetching restaurants:", error);
    return null;
  }
};

// ------------------ RESTAURANT DETAILS ------------------
const restaurantDetails = async (restaurantSlug) => {
  try {
    const query = gql`
      query RestaurantDetails {
        restaurant(where: { slug: "${restaurantSlug}" }) {
          address
          banner {
            url
          }
          id
          name
          slug
          workingHours
          restuarantType
          menu {
            ... on Menu {
              id
              category
              menuItem {
                ... on MenuItem {
                  id
                  name
                  price
                  description
                  productImage {
                    id
                    url
                  }
                }
              }
            }
          }
        }
      }
    `;
    const result = await client.request(query);
    console.log("✅ Restaurant details fetched:", result);
    return result;
  } catch (error) {
    console.error("❌ Error fetching restaurant details:", error);
    return null;
  }
};

// ------------------ ADD TO CART ------------------
const AddToCart = async (data) => {
  try {
    const priceValue =
      typeof data.praice === "number" ? data.price : Number(data.price) || 0;

    const query = gql`
      mutation AddToCart {
        createShoppingCart(
          data: {
            productName: "${data.productName.replace(/"/g, '\\"')}",
            praice: ${priceValue},
            productDescription: "${data.productDescription.replace(/"/g, '\\"')}",
            email: "${data.email}",
            productImage: { connect: { id: "${data.productImageId}" } }
          }
        ) {
          id
        }
        publishManyShoppingCarts(to: PUBLISHED) {
          count
        }
      }
    `;

    const result = await client.request(query);
    console.log("✅ Item added to cart successfully:", result);
    return result;
  } catch (error) {
    console.error("❌ Error adding item to cart:", error.response || error);
    return null;
  }
};


// ------------------ GET USER CART ------------------
const getUserCart = async (userEmail) => {
  try {
    const query = gql`
      query GetUserCart {
        shoppingCarts(where: { email: "${userEmail}" }) {
          id
          praice
          productDescription
          productName
          productImage {
            id
            url
          }
        }
      }
    `;

    const result = await client.request(query);
    console.log("✅ User cart fetched successfully:", result);
    return result;
  } catch (error) {
    console.error("❌ Error fetching user cart:", error.response || error);
    return null;
  }
};


// ------------------ DELETE FROM CART ------------------
const DeleteFromCart = async (id) => {
  try {
    const query = gql`
      mutation MyMutation {
        deleteShoppingCart(where: { id: "${id}" }) {
          id
        }
      }
    `;
    const result = await client.request(query);
    console.log("✅ Item deleted from cart:", result);
    return result;
  } catch (error) {
    console.error("❌ Error deleting item from cart:", error);
    return null;
  }
};

// ------------------ ADD NEW REVIEW ------------------
const addNewReview = async (data) => {
  try {
    const query = gql`
      mutation AddReview {
        createReview(
          data: {
            userEmail: "${data.userEmail}"
            userName: "${data.userName}"
            comment: "${data.comment.replace(/"/g, '\\"')}"
            rating: ${data.rating}
            restaurants: { connect: { slug: "${data.restaurantSlug}" } }
          }
        ) {
          comment
          id
        }
        publishManyReviews(to: PUBLISHED) {
          count
        }
      }
    `;
    const result = await client.request(query);
    console.log("✅ Review added successfully:", result);
    return result;
  } catch (error) {
    console.error("❌ Error adding review:", error);
    return null;
  }
};

// ------------------ GET REVIEWS ------------------
const getReviews = async (restaurantSlug) => {
  try {
    const query = gql`
      query getReviews {
        reviews(where: { restaurants_some: { slug: "${restaurantSlug}" } }) {
          comment
          userEmail
          userName
          rating
          createdAt
        }
      }
    `;
    const result = await client.request(query);
    console.log("✅ Reviews fetched successfully:", result);
    return result;
  } catch (error) {
    console.error("❌ Error fetching reviews:", error);
    return null;
  }
};

// ------------------ CREATE NEW ORDER ------------------
const createNewOrder = async (data) => {
  try {
    if (!data.orderItems || !data.orderItems.length) {
      
      return null;
    }

    const orderDetilesString = data.orderItems
      .map(
        (item) =>
          `{ name: "${item.name.replace(/"/g, '\\"')}", praice: ${Number(item.praice)} }`
      )
      .join(",");

    const query = gql`
      mutation MyMutation {
        createOrder(
          data: {
            userName: "${data.userName.replace(/"/g, '\\"')}"
            email: "${data.email}"
            address: "${data.address.replace(/"/g, '\\"')}"
            phone: ${Number(data.phone)}
            zip: ${Number(data.zip)}
            orderAmount: ${Number(data.orderAmount)}
            orderDetails: { create: [${orderDetilesString}] }
          }
        ) {
          id
          userName
          orderAmount
          orderDetails {
            id
            name
            price
          }
        }
        publishManyOrders(to: PUBLISHED) {
          count
        }
      }
    `;

    const result = await client.request(query);
    console.log("✅ Order created successfully:", result);
    return result.createOrder;
  } catch (error) {
    console.error("❌ Error creating order:", error);
    return null;
  }
};





// ------------------ MY ORDERS ------------------
const myOrders = async (email) => {
  try {
    const query = gql`
      query MyOrders {
        orders(where: {email: "${email}"}) {
    address
    createdAt
    id
    orderAmount
    orderDetails {
      ... on Orderitem {
        id
        email
        name
      }
    }
    phone
    userName
  }
      
}
    `;
    const result = await client.request(query);
    console.log("✅ Orders fetched successfully:", result);
    return result;
  } catch (error) {
    console.error("❌ Error fetching orders:", error);
    return null;
  }
};

export default {
  getCategory,
  getRestaurant,
  restaurantDetails,
  AddToCart,
  getUserCart,
  DeleteFromCart,
  addNewReview,
  getReviews,
  createNewOrder,
  myOrders,
};
