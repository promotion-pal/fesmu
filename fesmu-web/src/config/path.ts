export interface BasePageProps {
  id?: string | number;
}

const DYNAMIC_PATH = (
  segments: (string | undefined | number)[],
  props?: BasePageProps,
): string => {
  const filteredSegments = segments.filter(
    (s): s is string => s !== undefined && s !== "",
  );

  return `/${filteredSegments.join("/")}`;
};

const ROUTE = {
  MAIN: DYNAMIC_PATH(["/"]),
  BOARD: DYNAMIC_PATH(["board"]),
  DUTY: (props?: BasePageProps) => DYNAMIC_PATH(["duty", props?.id], props),
  VACATION: (props?: BasePageProps) =>
    DYNAMIC_PATH(["vacation", props?.id], props),
};

export { DYNAMIC_PATH, ROUTE };
