import { zodResolver } from "@hookform/resolvers/zod";
import { Trans, useLingui } from "@lingui/react/macro";
import { Dispatch, SetStateAction, useContext } from "react";
import { Controller, useForm } from "react-hook-form";

import { updateUser } from "@/app/[lang]/actions";
import { UserContext } from "@/app/[lang]/providers";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UpdateUserFields, updateUserSourceSchema } from "@/lib/types";

import { Toaster, toast } from "../ui/toast";

const items = [
  { label: "English", value: "en" },
  { label: "Русский", value: "ru" },
];

export default function SettingsDialog({
  isDialogOpen,
  dialogOpenFn,
}: Readonly<{
  isDialogOpen: boolean;
  dialogOpenFn: Dispatch<SetStateAction<boolean>>;
}>) {
  const user = useContext(UserContext);
  const { t } = useLingui();
  const form = useForm<UpdateUserFields>({
    resolver: zodResolver(updateUserSourceSchema),
    defaultValues: {
      sourceLanguage: user.sourceLanguage,
    },
  });

  return (
    <Dialog open={isDialogOpen} onOpenChange={dialogOpenFn}>
      <DialogContent className="min-w-1/3">
        <DialogHeader>
          <DialogTitle>
            <Trans>Settings</Trans>
          </DialogTitle>
        </DialogHeader>
        <div className="flex w-full items-center gap-x-5">
          <form
            className="w-1/2"
            onSubmit={form.handleSubmit(async (data) => {
              toast.promise(updateUser(data), {
                loading: t`Processing`,
                success: t`Settings was saved successfully!`,
                error: t`Something went wrong.`,
              });
            })}
          >
            <FieldGroup>
              <FieldSet>
                <FieldGroup>
                  <Controller
                    name="sourceLanguage"
                    control={form.control}
                    render={({ field }) => (
                      <Field>
                        <FieldLabel htmlFor="source-language">
                          <Trans>Source language</Trans>
                        </FieldLabel>
                        <Select
                          id="source-language"
                          value={field.value}
                          onValueChange={field.onChange}
                          items={items}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem key="en" value="en">
                                English
                              </SelectItem>
                              <SelectItem key="ru" value="ru">
                                Русский
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </Field>
                    )}
                  />
                </FieldGroup>
              </FieldSet>
              <Field className="max-w-24">
                <Button type="submit">
                  <Trans>Save</Trans>
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </div>
        <Toaster />
      </DialogContent>
    </Dialog>
  );
}
