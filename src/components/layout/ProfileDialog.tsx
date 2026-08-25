import { zodResolver } from "@hookform/resolvers/zod";
import { Trans, useLingui } from "@lingui/react/macro";
import { Dispatch, SetStateAction, useContext } from "react";
import { Controller, useForm } from "react-hook-form";

import { updateUser, uploadAvatar } from "@/app/[lang]/actions";
import { UserContext } from "@/app/[lang]/providers";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { UpdateUserFields, updateUserSourceSchema } from "@/lib/types";

import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Toaster, toast } from "../ui/toast";

const ACCEPT_IMAGE_TYPES = ["jpg", "jpeg", "png"];

export default function ProfileDialog({
  isDialogOpen,
  dialogOpenFn,
}: Readonly<{
  isDialogOpen: boolean;
  dialogOpenFn: Dispatch<SetStateAction<boolean>>;
}>) {
  const { user, setUserFn } = useContext(UserContext);
  const form = useForm<UpdateUserFields>({
    resolver: zodResolver(updateUserSourceSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
    },
  });
  const { t } = useLingui();

  const handleFileInput = async (e) => {
    toast.promise(
      (async () => {
        const { avatar_url } = await uploadAvatar(e.target.files);
        setUserFn((prev) => ({ ...prev, avatarUrl: avatar_url }));
      })(),
      {
        loading: t`Processing`,
        success: t`The profile picture was updated successfully!`,
        error: t`Something went wrong.`,
      },
    );
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={dialogOpenFn}>
      <DialogContent className="min-w-1/3">
        <DialogHeader>
          <DialogTitle>
            <Trans>Profile</Trans>
          </DialogTitle>
        </DialogHeader>
        <div className="flex w-full items-center gap-x-5">
          <div className="flex w-1/2 flex-col items-center gap-y-5">
            <Avatar className="h-40 w-40">
              <AvatarImage
                className="h-full w-full"
                src={user.avatarUrl}
                alt="avatar"
              />
            </Avatar>
            <Field className="flex w-full flex-col items-center">
              <Input
                type="file"
                className="max-w-1/2"
                accept={ACCEPT_IMAGE_TYPES.join(", ")}
                onInput={handleFileInput}
              />
              <FieldDescription className="text-center">
                Upload an image as the avatar
              </FieldDescription>
            </Field>
          </div>
          <form
            className="w-1/2"
            onSubmit={form.handleSubmit(async (data) => {
              toast.promise(updateUser(data), {
                loading: t`Processing`,
                success: t`The profile was updated successfully!`,
                error: t`Something went wrong.`,
              });
            })}
          >
            <FieldGroup>
              <FieldSet>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="email">
                      <Trans>Email</Trans>
                    </FieldLabel>
                    <Input id="email" disabled defaultValue={user.email} />
                  </Field>
                </FieldGroup>
                <FieldGroup>
                  <Controller
                    name="firstName"
                    control={form.control}
                    render={({ field }) => (
                      <Field>
                        <FieldLabel htmlFor="first-name">
                          <Trans>First name</Trans>
                        </FieldLabel>
                        <Input id="first-name" {...field} />
                      </Field>
                    )}
                  />
                  <Controller
                    name="lastName"
                    control={form.control}
                    render={({ field }) => (
                      <Field>
                        <FieldLabel htmlFor="last-name">
                          <Trans>Last name</Trans>
                        </FieldLabel>
                        <Input id="last-name" {...field} />
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
