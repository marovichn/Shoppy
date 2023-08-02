import { FC, useState } from "react";
import Modal from "@/components/ui/modal";
import useStoreModal from "@/hooks/use-store-modal";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface StoreModalProps {}

const formSchema = z.object({ name: z.string().min(2) });

const StoreModal: FC<StoreModalProps> = ({}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const StoreModal = useStoreModal();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/stores", values);
      form.reset();

      window.location.assign(`/${response.data.id}`);
    } catch (err) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title='Create store'
      description='Add a new store to manage products and categories'
      isOpen={StoreModal.isOpen}
      onClose={StoreModal.onClose}
    >
      <div>
        <div className='space-y-4 py-2 pb-4'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Store Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder='E-commerce'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage content='Required' />
                  </FormItem>
                )}
              />
              <div className='pt-6 space-x-2 flex items-center justify-end w-full'>
                <Button disabled={loading} type='submit'>
                  Continue
                </Button>
              </div>
            </form>
            <div className="flex items-center justify-end absolute bottom-11 right-32"><Button
            className="text-xs px-2 h-8"
              disabled={loading}
              variant='outline'
              onClick={StoreModal.onClose}
            >
              Cancel
            </Button></div>
            
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default StoreModal;
