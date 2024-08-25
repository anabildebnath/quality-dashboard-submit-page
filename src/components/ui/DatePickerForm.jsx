import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { InputFile } from "./InputFile";

const FormSchema = z.object({
  dob: z.date({
    required_error: "A date of submission is required",
  }),
});

export function DatePickerForm() {
  const form = useForm({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center">
              <FormLabel className="mb-32 mt-12 text-2xl">
                SW R&D System 2024
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <div className="flex items-center gap-12">
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>{" "}
                      <DropdownMenu>
                        <DropdownMenuTrigger className="bg-black text-white w-24 h-8 rounded-md">
                          File Type
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel>Jsx</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Tsx</DropdownMenuItem>
                          <DropdownMenuItem>Python</DropdownMenuItem>
                          <DropdownMenuItem>Java</DropdownMenuItem>
                          <DropdownMenuItem>Html</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </FormControl>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>CR last updated on...</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center">
          <InputFile className="w-[240px]" />
        </div>
        <Button type="submit" className="mx-auto">
          Submit
        </Button>
      </form>
    </Form>
  );
}
