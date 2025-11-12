
import CategoryList from "./_components/CategoryList";
import RestaurantList from "./_components/RestaurantList";

export default function page() {
  return (
    <div className="p-9">
        <CategoryList/>
        <RestaurantList/>
      </div>
  );
}
