import { FC } from "react";
import Modal from "@/components/ui/modal";
import useStoreModal from "@/hooks/use-store-modal";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface StoreModalProps {}

const formSchema = z.object({ name: z.string().min(2) });

const StoreModal: FC<StoreModalProps> = ({}) => {
  const StoreModal = useStoreModal();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    //CREATE STORE
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
                <FormField control={form.control} name="name" render={({field})=><FormItem>
                    <FormLabel>Store Name</FormLabel>
                    <FormControl>
                        <Input placeholder="E-commerce" {...field}/>
                    </FormControl>
                    <FormMessage content="Required"/>
                </FormItem>} />
                <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                    <Button variant="outline" onClick={StoreModal.onClose}>Cancel</Button>
                    <Button type="submit">Continue</Button>
                </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default StoreModal;
