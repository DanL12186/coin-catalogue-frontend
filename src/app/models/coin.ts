//this literally does nothing unless called directly.
export class Coin {
  constructor(
    public id: number,
    public year: number,
    public mintmark: string,
    public denomination: string,
    public category: string,
    public mintage: number,
    public generic_img_url: string,
    public metal_composition: JSON,
    public pcgs_num: number,
    public series: string,
    public diameter: number
  ) {
      this.id = id;
      this.year = year;
      this.mintmark = mintmark
      this.denomination = denomination
      this.category = category
      this.mintage = mintage
      this.generic_img_url = generic_img_url
      this.metal_composition = metal_composition
      this.pcgs_num = pcgs_num
      this.series = series
      this.diameter = diameter
  }

  yearAndMintmark() : string {
    return this.mintmark ? `${this.year}-${this.mintmark}` : `${this.year}`
  }

  metals() : string {
    const metals = [];

    for (const metal in this.metal_composition) {
      const percentage = this.metal_composition[metal]
      metals.push(`${metal} (${percentage}%)`)
    }
    
    return metals.join(', ');
  }
}