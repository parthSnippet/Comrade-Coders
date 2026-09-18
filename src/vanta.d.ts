declare module "vanta/dist/vanta.birds.min" {
  type VantaBirdsEffect = (options: Record<string, unknown>) => {
    destroy: () => void;
  };

  const birds: VantaBirdsEffect;
  export default birds;
}
