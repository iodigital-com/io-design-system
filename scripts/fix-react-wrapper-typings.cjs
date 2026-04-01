const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');

function updateFile(relativePath, replacements) {
  const filePath = path.join(repoRoot, relativePath);
  let content = fs.readFileSync(filePath, 'utf8');

  replacements.forEach(({ from, to, label }) => {
    if (!content.includes(from)) {
      throw new Error(`Pattern not found for ${label} in ${relativePath}`);
    }
    content = content.replace(from, to);
  });

  fs.writeFileSync(filePath, content, 'utf8');
}

updateFile('io-components-react/src/react-component-lib/utils/index.tsx', [
  {
    label: 'createForwardRef signature and body',
    from: `export const createForwardRef = <PropType, ElementType>(ReactComponent: any, displayName: string) => {
  const forwardRef = (
    props: StencilReactExternalProps<PropType, ElementType>,
    ref: StencilReactForwardedRef<ElementType>
  ) => {
    return <ReactComponent {...props} forwardedRef={ref} />;
  };
  forwardRef.displayName = displayName;

  return React.forwardRef(forwardRef);
};`,
    to: `export const createForwardRef = <PropType extends object, ElementType extends HTMLElement>(
  ReactComponent: any,
  displayName: string
) => {
  type ExternalProps = StencilReactExternalProps<PropType, ElementType>;

  const forwardRef = (
    props: React.PropsWithoutRef<ExternalProps>,
    ref: React.ForwardedRef<ElementType>
  ) => {
    return <ReactComponent {...(props as ExternalProps)} forwardedRef={ref} />;
  };
  forwardRef.displayName = displayName;

  return React.forwardRef<ElementType, ExternalProps>(forwardRef);
};`,
  },
]);

updateFile('io-components-react/src/react-component-lib/createComponent.tsx', [
  {
    label: 'createReactComponent PropType generic constraint',
    from: `export const createReactComponent = <
  PropType,
  ElementType extends HTMLStencilElement,`,
    to: `export const createReactComponent = <
  PropType extends object,
  ElementType extends HTMLStencilElement,`,
  },
]);

updateFile('io-components-react/src/react-component-lib/createOverlayComponent.tsx', [
  {
    label: 'overlay props types',
    from: `  type Props = OverlayComponent &
    ReactOverlayProps & {
      forwardedRef?: StencilReactForwardedRef<OverlayType>;
    };`,
    to: `  type Props = OverlayComponent & ReactOverlayProps;
  type PropsWithRef = Props & {
    forwardedRef?: StencilReactForwardedRef<OverlayType>;
  };`,
  },
  {
    label: 'Overlay class prop type',
    from: `  class Overlay extends React.Component<Props> {`,
    to: `  class Overlay extends React.Component<PropsWithRef> {`,
  },
  {
    label: 'constructor prop type',
    from: `    constructor(props: Props) {`,
    to: `    constructor(props: PropsWithRef) {`,
  },
  {
    label: 'shouldComponentUpdate prop type',
    from: `    shouldComponentUpdate(nextProps: Props) {`,
    to: `    shouldComponentUpdate(nextProps: PropsWithRef) {`,
  },
  {
    label: 'componentDidUpdate prop type',
    from: `    async componentDidUpdate(prevProps: Props) {`,
    to: `    async componentDidUpdate(prevProps: PropsWithRef) {`,
  },
  {
    label: 'present prop type',
    from: `    async present(prevProps?: Props) {`,
    to: `    async present(prevProps?: PropsWithRef) {`,
  },
  {
    label: 'forwardRef render cast',
    from: `  return React.forwardRef<OverlayType, Props>((props, ref) => {
    return <Overlay {...props} forwardedRef={ref} />;
  });`,
    to: `  return React.forwardRef<OverlayType, Props>((props, ref) => {
    return <Overlay {...(props as PropsWithRef)} forwardedRef={ref} />;
  });`,
  },
]);

console.log('Patched generated React wrapper typing helpers.');
