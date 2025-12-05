import { vendors } from "../../data/vendors";
import VendorProfileClient from "./VendorProfileClient";

export async function generateStaticParams() {
  return vendors.map((vendor) => ({
    id: vendor.id,
  }));
}

export default function VendorProfilePage() {
  return <VendorProfileClient />;
}
