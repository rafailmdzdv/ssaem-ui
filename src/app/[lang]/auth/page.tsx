import { Trans } from "@lingui/react/macro";
import Form from "next/form";

import { signIn } from "@/app/[lang]/auth/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import initLingui from "@/initLingui";

export default async function Page({
  params,
}: Readonly<{ params: Promise<{ lang: string }> }>) {
  const lang = (await params).lang;
  initLingui(lang);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>
            <Trans>Sign in</Trans>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form action={signIn} id="signin-form">
            <div className="flex flex-col gap-y-6">
              <div className="grid gap-y-2">
                <Label htmlFor="email">
                  <Trans>Email</Trans>
                </Label>
                <Input
                  name="email"
                  type="email"
                  placeholder="email@example.ru"
                  required
                />
              </div>
              <div className="grid gap-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="password">
                    <Trans>Password</Trans>
                  </Label>
                  <a className="l-auto pointer-events-auto inline-block text-sm underline-offset-4 hover:underline">
                    <Trans>Forgot the password?</Trans>
                  </a>
                </div>
                <Input name="password" type="password" required />
              </div>
            </div>
          </Form>
        </CardContent>
        <CardFooter>
          <Button
            variant="default"
            type="submit"
            form="signin-form"
            className="w-full"
          >
            <Trans>Sign in</Trans>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
