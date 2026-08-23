"use client";

import { Trans } from "@lingui/react/macro";
import { LogOut, Settings2, UserIcon } from "lucide-react";
import { useContext, useState } from "react";

import { logOut } from "@/app/[lang]/auth/actions";
import { UserContext } from "@/app/[lang]/providers";
import ProfileDialog from "@/components/layout/ProfileDialog";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import SettingsDialog from "./SettingsDialog";

export default function Header({ lang }) {
  const [isProfileDialogOpen, setProfileDialogOpen] = useState<boolean>(false);
  const [isSettingsDialogOpen, setSettingsDialogOpen] =
    useState<boolean>(false);
  const user = useContext(UserContext);

  return (
    <header className="p-3">
      <ProfileDialog
        isDialogOpen={isProfileDialogOpen}
        dialogOpenFn={setProfileDialogOpen}
      />
      <SettingsDialog
        isDialogOpen={isSettingsDialogOpen}
        dialogOpenFn={setSettingsDialogOpen}
      />
      <div className="flex w-full justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="ghost">
                <Avatar>
                  <AvatarImage src={user?.avatarUrl} alt="avatar"></AvatarImage>
                </Avatar>
                {user?.email}
              </Button>
            }
          ></DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setProfileDialogOpen(true)}>
              <UserIcon />
              <Trans>Profile</Trans>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSettingsDialogOpen(true)}>
              <Settings2 />
              <Trans>Settings</Trans>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => logOut()}>
              <LogOut />
              <Trans>Sign out</Trans>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
