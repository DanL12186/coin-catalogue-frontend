export class Coin {
  constructor(
    public id?: number,
    public year?: number,
    public mintmark?: string,
    public denomination?: string,
    public category?: string,
    public mintage?: number,
    public generic_img_url?: string,
    public metal_composition?: JSON,
    public pcgs_num?: number,
    public series?: string,
    public diameter?: number,
    public mass?: number,
    public designer?: string,
    public pcgs_population?: JSON,
    public pcgs_total?: number
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
      this.mass = mass
      this.designer = designer
      this.pcgs_population = pcgs_population
      this.pcgs_total = pcgs_total
  }

  static denominationToCategory(denomination: string): string {
    const categories = { 
      '1C': 'Pennies',
      '5C': 'Nickels',
      '10C': 'Dimes',
      '25C': 'Quarters',
      '50C': 'Half Dollars',
      '$1': 'Silver Dollars',
      
      '$1G': 'Gold Dollars', 
      '$2.50': 'Quarter Eagles', 
      '$5': 'Half Eagles', 
      '$10': 'Eagles', 
      '$20': 'Double Eagles' 
    }

    return categories[denomination];
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