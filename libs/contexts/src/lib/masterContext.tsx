import { SafeAny } from "@sotatek/models";

interface Props {
  components: Array<
    | [React.JSXElementConstructor<React.PropsWithChildren<SafeAny>>, SafeAny]
    | [React.JSXElementConstructor<React.PropsWithChildren<SafeAny>>]
  >;
  children: React.ReactNode;
}

export function MasterContext(props: Props) {
  const { components = [], children } = props;

  return (
    <>
      {components.reduceRight((acc, component) => {
        const Comp = component[0];
        return <Comp {...(component?.[1] ?? {})}>{acc}</Comp>;
      }, children)}
    </>
  );
}
