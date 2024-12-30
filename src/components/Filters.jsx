import { Form, Link, useSearchParams } from "react-router-dom";
import FormInput from "./FormInput";
import FormRange from "./FormRange";
import FormSelect from "./FormSelect";

const Filters = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search")?.toLowerCase() || "";
  const price = searchParams.get("price") || "";
  const category = searchParams.get("category") || "";

  return (
    <Form className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4  gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 items-center">
      {/* SEARCH */}
      <FormInput
        type="search"
        label="search product"
        name="search"
        size="input-sm"
        defaultValue={search}
      />
      {/* CATEGORIES */}
      <FormSelect
        label="select category"
        name="category"
        list={[
          "all",
          "Doors & Windows",
          "Outdoor & Garden",
          "Garden Furniture",
          "Garden Tables",
          "Laminox Doors",
        ]}
        size="select-sm"
        defaultValue={category}
      />
      {/* ORDER */}
      <FormSelect
        label="sort by"
        name="order"
        list={["Papular", "Most Relevant"]}
        size="select-sm"
        defaultValue={"Papular"}
      />
      {/* PRICE */}
      <FormRange
        name="price"
        label="select price"
        size="range-sm"
        price={price}
      />
      <div></div>
      <div></div>
      {/* BUTTONS */}
      <button
        type="submit"
        className="btn btn-primary btn-sm"
        style={{ backgroundColor: "#a67a53", border: "none", color: "#fffff" }}
      >
        search
      </button>
      <Link
        to="/products"
        className="btn btn-accent btn-sm"
        style={{ backgroundColor: "#a67a53", border: "none", color: "#fffff" }}
      >
        reset
      </Link>
    </Form>
  );
};
export default Filters;
