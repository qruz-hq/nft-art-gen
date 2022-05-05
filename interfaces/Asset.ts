export default interface Asset {
  id: string;
  traitId: number;
  name: string;
  src: string;
  percentage: number;
  locked: boolean;
}
