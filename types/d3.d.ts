declare module 'd3' {
  import { Selection, BaseType } from 'd3-selection'
  import { ScaleBand, ScaleLinear } from 'd3-scale'
  
  export * from 'd3-array'
  export * from 'd3-axis'
  export * from 'd3-brush'
  export * from 'd3-chord'
  export * from 'd3-color'
  export * from 'd3-contour'
  export * from 'd3-delaunay'
  export * from 'd3-dispatch'
  export * from 'd3-drag'
  export * from 'd3-dsv'
  export * from 'd3-ease'
  export * from 'd3-fetch'
  export * from 'd3-force'
  export * from 'd3-format'
  export * from 'd3-geo'
  export * from 'd3-hierarchy'
  export * from 'd3-interpolate'
  export * from 'd3-path'
  export * from 'd3-polygon'
  export * from 'd3-quadtree'
  export * from 'd3-random'
  export * from 'd3-scale'
  export * from 'd3-scale-chromatic'
  export * from 'd3-selection'
  export * from 'd3-shape'
  export * from 'd3-time'
  export * from 'd3-time-format'
  export * from 'd3-timer'
  export * from 'd3-transition'
  export * from 'd3-zoom'

  export function select(selector: string | BaseType): Selection<BaseType, unknown, null, undefined>
  export function selectAll(selector: string): Selection<BaseType, unknown, null, undefined>
  
  export function scaleBand<Domain = string>(): ScaleBand<Domain>
  export function scaleLinear<Output = number, Input = number>(): ScaleLinear<Output, Input>

  // Add Axis interface
  interface Axis<Domain> {
    (selection: Selection<SVGGElement, unknown, null, undefined>): void
    scale(): ScaleLinear<number, Domain> | ScaleBand<Domain>
    scale(scale: ScaleLinear<number, Domain> | ScaleBand<Domain>): this
    ticks(count?: number): this
    tickValues(values: Domain[]): this
    tickFormat(format: (domainValue: Domain, index: number) => string): this
    tickSize(size: number): this
    tickSizeInner(size: number): this
    tickSizeOuter(size: number): this
    tickPadding(padding: number): this
  }

  // Add axis functions
  export function axisBottom<Domain>(scale: ScaleLinear<number, Domain> | ScaleBand<Domain>): Axis<Domain>
  export function axisLeft<Domain>(scale: ScaleLinear<number, Domain> | ScaleBand<Domain>): Axis<Domain>
  export function axisRight<Domain>(scale: ScaleLinear<number, Domain> | ScaleBand<Domain>): Axis<Domain>
  export function axisTop<Domain>(scale: ScaleLinear<number, Domain> | ScaleBand<Domain>): Axis<Domain>

  // Extend Selection interface to handle data types
  interface Selection<GElement extends BaseType, Datum, PElement extends BaseType, PDatum> {
    selectAll<ChildElement extends BaseType = BaseType, ChildDatum = unknown>(
      selector: string
    ): Selection<ChildElement, ChildDatum, GElement, Datum>
    data<NewDatum>(
      data: NewDatum[],
      key?: (d: NewDatum, i: number, data: NewDatum[]) => string
    ): Selection<GElement, NewDatum, PElement, PDatum>
    enter(): Selection<GElement, Datum, PElement, PDatum>
    attr(name: string, value: string | number | boolean | ((d: Datum, i: number, nodes: GElement[]) => string | number | boolean)): this
    style(name: string, value: string | number | boolean | ((d: Datum, i: number, nodes: GElement[]) => string | number | boolean)): this
    text(value: string | number | ((d: Datum, i: number, nodes: GElement[]) => string | number)): this
    remove(): this
    append<K extends keyof SVGElementTagNameMap>(name: K): Selection<SVGElementTagNameMap[K], Datum, PElement, PDatum>
    append(name: string): Selection<BaseType, Datum, PElement, PDatum>
    call<A extends any[]>(fn: (selection: this, ...args: A) => void, ...args: A): this
  }
} 