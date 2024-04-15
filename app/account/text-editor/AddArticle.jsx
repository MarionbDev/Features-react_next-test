"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import * as yup from "yup";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// import { Loader2, LogIn } from "lucide-react";
import { addArticle } from "@/app/api/article/route";
// import ReactQuill from "react-quill";
import dynamic from "next/dynamic";
import { Toaster, toast } from "sonner";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

const loginFormSchema = yup.object().shape({
  title: yup
    .string("Vous devez renseigner un titre")
    .required("Un titre valide est requis"),
  photos: yup.string(""),
  description: yup
    .string("Vous devez renseigner une description")
    .required("Une description valide est requise"),
  price: yup
    .string("Vous devez renseigner une prix")
    .required("Un prix valide est requis"),
});

export default function AddArticle() {
  const [isLoading, setIsLoading] = useState(false);

  // const router = useRouter();

  const form = useForm({ resolver: yupResolver(loginFormSchema) });

  const handleLoginFormSubmit = async (values) => {
    try {
      setIsLoading(true);
      await addArticle(values);
      // router.push("/login");
      toast.success("Ajout de l'article réussi !");
    } catch (error) {
      console.error(error);
      toast.error(error.message);
      if (error.error_description) {
        toast.error(error.description);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleLoginFormSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle>Formulaire pour ajouter un article</CardTitle>
              {/* <CardDescription></CardDescription> */}
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titre de l&apos;article</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="photos"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Photos</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Controller
                        name="description"
                        control={form.control}
                        defaultValue=""
                        render={({ field }) => (
                          <ReactQuill
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Écrivez quelque chose..."
                            className="w-[30rem] h-[10rem]"
                          />
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="mt-10 w-40">
                    <FormLabel>Prix en €</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="justify-center">
              <Button
                role="button"
                aria-label="ajouter l'article"
                disabled={isLoading}
                className="gap-3 "
              >
                {/* {isLoading ? (
                <Loader2 className="animate-spin" size="16" />
              ) : (
                <LogIn size="16" />
              )} */}
                Ajouter l&apos;article
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
      <Toaster />
    </>
  );
}
