"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SelectCategory from "../components/SelectCategory";
import { Textarea } from "@/components/ui/textarea";
import { TipTapEditor } from "../components/Editor";
import { UploadDropzone } from "@/lib/uploadthing";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { JSONContent } from "@tiptap/react";
import { useFormState } from "react-dom";
import { SellProduct, State } from "../action";
import { toast } from "sonner";
import { SubmitButton } from "../components/SubmitButton";

export default function SellRoute() {
  const [json, setJson] = useState<null | JSONContent>(null);
  const [images, setImages] = useState<null | string[]>(null);
  const [productFile, setProductFile] = useState<null | string>(null);
  const initialState: State = {
    message: "",
    status: undefined,
  };
  const [state, formAction] = useFormState(SellProduct, initialState);

  useEffect(() => {
    if (state?.status === "success") {
      toast.success(state.message);
    } else if (state?.status === "error") {
      toast.error(state.message);
    }
  }, [state]);
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 mb-14">
      <Card>
        <form action={formAction}>
          <CardHeader>
            <CardTitle>Sell your Product with ease</CardTitle>
            <CardDescription>
              Describe your product in details here so thatyou can sell with
              ease.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-y-10">
            <div className="flex flex-col gap-y-2">
              <Label>Name</Label>
              <Input
                type="text"
                placeholder="Name of your Product"
                name="name"
                required
                minLength={3}
              ></Input>
              {state?.errors?.["name"]?.[0] && (
                <p className="text-red-500">{state?.errors?.["name"]?.[0]}</p>
              )}
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Select Category</Label>
              <SelectCategory />
              {state?.errors?.["category"]?.[0] && (
                <p className="text-red-500">
                  {state?.errors?.["category"]?.[0]}
                </p>
              )}
            </div>
            {/* 
Price section */}
            <div className="flex  flex-col gap-y-2">
              <Label>Price</Label>
              <Input
                type="number"
                placeholder="295"
                name="price"
                required
                min={1}
              ></Input>
              {state?.errors?.["price"]?.[0] && (
                <p className="text-red-500">{state?.errors?.["price"]?.[0]}</p>
              )}
            </div>
            {/* 
Summary section */}
            <div className="flex  flex-col gap-y-2">
              <Label>Small Summary</Label>
              <Textarea
                name="smallDescription"
                placeholder="Please describe your product short description right here..."
                required
                minLength={10}
              />
              {state?.errors?.["smallDescription"]?.[0] && (
                <p className="text-red-500">
                  {state?.errors?.["smallDescription"]?.[0]}
                </p>
              )}
            </div>
            {/*             
TipTapEditor */}
            <div className="flex  flex-col gap-y-2">
              <input
                type="hidden"
                name="description"
                value={JSON.stringify(json)}
              />
              <Label>Description</Label>
              <TipTapEditor json={json} setJson={setJson} />
              {state?.errors?.["description"]?.[0] && (
                <p className="text-red-500">
                  {state?.errors?.["description"]?.[0]}
                </p>
              )}
            </div>
            {/* 
File Uploader */}
            <div className=" flex flex-col gap-y-2">
              <input
                type="hidden"
                name="images"
                value={JSON.stringify(images)}
              />
              <Label>Product Images</Label>
              <UploadDropzone
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  setImages(res.map((item) => item.url));
                  toast.success("Your image have been uplaoded!");
                }}
                onUploadError={() => {
                  toast.error("Something went wrong, try again");
                }}
              />
              {state?.errors?.["images"]?.[0] && (
                <p className="text-red-500">{state?.errors?.["images"]?.[0]}</p>
              )}
            </div>

            {/* 
Product Uploader */}
            <div className=" flex flex-col gap-y-2">
              <input
                type="hidden"
                name="productFile"
                value={productFile ?? ""}
              />
              <Label>Product File</Label>
              <UploadDropzone
                endpoint="productFileUpload"
                onClientUploadComplete={(res) => {
                  setProductFile(res[0].url);
                  toast.success("Your Product file has been uplaoded!");
                }}
                onUploadError={() => {
                  toast.error("Something went wrong, try again");
                }}
              />
              {state?.errors?.["productFile"]?.[0] && (
                <p className="text-red-500">
                  {state?.errors?.["productFile"]?.[0]}
                </p>
              )}
            </div>
          </CardContent>

          <CardFooter className="mt-5">
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>
    </section>
  );
}
