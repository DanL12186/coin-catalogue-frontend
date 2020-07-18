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
    public pcgs_total?: number,
    public special_designation?: string,
    public price_table?: JSON,
    public next_coin?: string,
    public prev_coin?: string,
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
      this.special_designation = special_designation
      this.price_table = price_table
      this.next_coin = next_coin
      this.prev_coin = prev_coin
  }

  static denominationToCategory(denomination: string): string {
    const categories = { 
      '1C': 'Pennies',
      '2C': 'Two Cent Pieces',
      '3C': 'Three Cent Pieces',
      '5C': 'Nickels',
      '10C': 'Dimes',
      '25C': 'Quarters',
      '50C': 'Half Dollars',
      '$1': 'Silver Dollars',
      
      '$1G': 'Gold Dollars', 
      '$2.50': 'Quarter Eagles',
      '$3': 'Three Dollars',
      '$5': 'Half Eagles', 
      '$10': 'Eagles', 
      '$20': 'Double Eagles' 
    }

    return categories[denomination];
  }

  static denominationToMetalType(denomination: string) {
    const denominationMaterials = {
      '0.5C': 'copper',
      '1C': 'copper',
      '2C': 'copper',
      '3C': 'silver',
      '5C': 'nickel',
      '10C': 'silver',
      '20C': 'silver',
      '25C': 'silver',
      '50C': 'silver',
      '$1': 'silver',
    }
    
    return denominationMaterials[denomination] || 'gold'
  }

  metal(): string {
    if (this.metal_composition['gold']) {
      return 'gold';
    }
    if (this.metal_composition['silver']) {
      return 'silver';
    }

    return 'other';
  }

  weightInOunces(): number {
    return Math.round(this.mass / 31.1035 * 100000) / 100000;
  }

  meltValue(pricesPerOunce : JSON): number {
    if (!this.metal_composition || !pricesPerOunce || this.metal() === 'other') {
      return 0;
    }

    const purity = this.metal_composition[this.metal()] / 100
    const value = this.weightInOunces() * purity * pricesPerOunce[this.metal()]

    return Math.round(value * 100) / 100;
  }

  description() : string {
    if (this.mintmark) { 
      return `${this.year}-${this.mintmark} ${this.special_designation}`.trim();
    } else {
      return `${this.year} ${this.special_designation}`.trim();
    }
  }

  metals() : string {
    if (this.metal_composition === null) {
      return Coin.denominationToMetalType(this.denomination)
    }

    const metals = [];

    for (const metal in this.metal_composition) {
      const percentage = this.metal_composition[metal]
      metals.push(`${metal} (${percentage}%)`)
    }
    
    return metals.join(', ');
  }
}