"use client";

import { Store } from "@prisma/client";
import { FC, useState } from "react";
import Heading from "./Heading";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import { Separator } from "./ui/separator";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import AlertModal from "./modals/AlertModal";
import {ApiAlert} from "./ApiAlert";
import { useOrigin } from "@/hooks/use/use-origin";

interface SettingsFormProps {
  initialData: Store;
}

const formSchema = z.object({
  name: z.string().min(1),
});

type SettingsFormValues = z.infer<typeof formSchema>;

const SettingsForm: FC<SettingsFormProps> = ({ initialData }) => {
  const origin = useOrigin();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: SettingsFormValues) => {
    try {
      setLoading(true);
      const response = await axios.patch(`/api/stores/${params?.storeId}`, {
        name: data.name,
      });

      router.refresh();
      toast.success("Store has been updated!");
    } catch (err) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const deleteHandler = async () => {
    try {
      setLoading(true);
      const response = await axios.delete(`/api/stores/${params?.storeId}`);

      router.refresh();
      toast.success("Store deleted successfully");
    } catch (err) {
      toast.error("Make sure you removed all products and categories first!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AlertModal
        loading={loading}
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={deleteHandler}
      />
      <div className='flex items-center justify-between'>
        <Heading title='Settings' description='Manage Store Prefrences' />
        <Button
          disabled={loading}
          className='text-white font-bold group h-10 '
          variant='destructive'
          size='sm'
          onClick={() => setOpen(true)}
        >
          <p className='group-hover:w-24 group-hover:text-white transition-all w-0 text-transparent'>
            Delete Store
          </p>
          <Trash className='h-4 w-4 ml-2 mr-2' />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form
          className='space-y-8 w-full'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className='grid grid-cols-3 gap-8'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='ml-1 font-semibold'>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder='Store name'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className='ml-auto' type='submit'>
            Save changes
          </Button>
        </form>
      </Form>
      <Separator />
      <ApiAlert
        title='NEXT_PUBLIC_API_URL'
        description={`${origin}/api/${params.storeId}`}
        variant='public'
      />
    </>
  );
};
export default SettingsForm;
