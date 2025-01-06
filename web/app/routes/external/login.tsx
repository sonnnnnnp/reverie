import { Button, Card, CardBody, Divider, Input } from "@nextui-org/react";
import React from "react";
import client from "~/api";
import SimpleIconsGoogle from "~/components/icons/simple-icons/SimpleIconsGoogle";
import SimpleIconsLine from "~/components/icons/simple-icons/SimpleIconsLine";
import SimpleIconsX from "~/components/icons/simple-icons/SimpleIconsX";
import { WavyBackground } from "~/components/shared/WavyBackground";
import { Cookie } from "~/store/cookies";

export default function Login() {
  const [customId, setCustomId] = React.useState("");

  React.useEffect(() => {
    if (Cookie.accessToken()) {
      window.location.href = "/home";
      return;
    }
  }, []);

  const handleLoginWithCustomId = async () => {
    const { data } = await client.POST("/authorize/custom_id/{custom_id}", {
      params: { path: { custom_id: customId } },
    });

    if (!data?.ok) {
      alert(`ユーザー「${customId}」は見つかりませんでした。`);
      return;
    }

    Cookie.setAccessToken(data.data.access_token);
    Cookie.setRefreshToken(data.data.refresh_token);

    window.location.href = "/home";
  };

  return (
    <main className="grid place-items-center h-dvh w-full">
      <WavyBackground>
        <Card classNames={{ base: "bg-content1/60 backdrop-blur-md" }}>
          <CardBody className="grid gap-6 w-[350px] px-8 py-6">
            <div className="grid place-items-center gap-2">
              <h1 className="text-2xl font-medium">Reverie</h1>
              <p className="text-sm text-foreground-500">
                現実の外で、もっとリアルなつながりを。
              </p>
            </div>
            {import.meta.env.VITE_APP_ENV === "development" && (
              <>
                <div className="grid gap-3">
                  <Input
                    size="sm"
                    label="カスタムID"
                    variant="bordered"
                    classNames={{ inputWrapper: "rounded-large" }}
                    onValueChange={(value) => setCustomId(value)}
                  />
                  <Button color="primary" onPress={handleLoginWithCustomId}>
                    ログイン
                  </Button>
                </div>
                <div className="flex items-center gap-4 py-2">
                  <Divider className="flex-1" />
                  <p className="shrink-0 text-tiny text-default-500">
                    もしくは
                  </p>
                  <Divider className="flex-1" />
                </div>
              </>
            )}
            <div className="grid gap-2">
              <Button className="bg-default/60">
                <SimpleIconsGoogle className="w-5 h-5 mr-1" />
                Googleでログイン
              </Button>
              <Button className="bg-default/60">
                <SimpleIconsX className="w-5 h-5 mr-1" />
                Xでログイン
              </Button>
              <Button className="bg-default/60">
                <SimpleIconsLine className="w-5 h-5 mr-1" />
                LINEでログイン
              </Button>
            </div>
          </CardBody>
        </Card>
      </WavyBackground>
    </main>
  );
}
