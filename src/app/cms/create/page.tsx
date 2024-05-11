import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { getServerAuthSession } from "~/server/auth";
import { Product } from "~/types/product";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { db } from "~/server/db";
import { products } from "~/server/db/schema";
import { Plus } from "lucide-react";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";

async function createProduct(formData: FormData) {
  "use server";
  const session = await getServerAuthSession();

  console.log(formData.get("id"));

  const data = {
    id: formData.get("id"),
    name: formData.get("name"),
    description: formData.get("description"),
    imageUrl: formData.get("image"),
    price: +formData.get("price")! as any,
    category: formData.get("category"),
    userId: session?.user?.id,
  };

  await db.insert(products).values({ ...(data as any) });

  revalidatePath("/");
}

export default async function page() {
  const data = await getServerAuthSession();

  if (!data?.user) redirect("/");

  return (
    <form action={createProduct} className=" grid w-96 gap-2 ">
      <h1 className="flex items-center gap-2 text-2xl font-bold">
        <p className="-mt-1">Create a new product</p>{" "}
        <Plus className="h-8 w-8" />
      </h1>
      <Label htmlFor="id">Id</Label>
      <Input placeholder="Id" name="id" id="id" />

      <Label htmlFor="name">Name</Label>
      <Input placeholder="Name" name="name" id="name" />

      <Label htmlFor="image">Image url</Label>
      <Input placeholder="Image" name="image" id="image" />

      <Label htmlFor="description">Description</Label>
      <Textarea
        placeholder="Description"
        name="description"
        id="description"
        className="h-32"
      />

      <Label htmlFor="price">Price</Label>
      <Input placeholder="Price" name="price" id="price" />
      <Select name="category">
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="men's clothing">Men's clothing</SelectItem>
          <SelectItem value="electronics">Electronics</SelectItem>
        </SelectContent>
      </Select>
      <Button type="submit">submit</Button>
    </form>
  );
}
