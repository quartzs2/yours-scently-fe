declare module "*.svg" {
  import { SVGProps, FC } from "react";
  const content: FC<SVGProps<SVGElement>>;
  export default content;
}

declare module "*.svg?url" {
  const content: string;
  export default content;
}
