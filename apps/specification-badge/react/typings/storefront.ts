import type { FunctionComponent } from 'react'

// type GenericObject = Record<string, unknown>

// type StorefrontFC<T> = FunctionComponent<T>
export interface StorefrontFC<P> extends FunctionComponent<P> {
  getSchema?(props: P): Record<string, unknown>
  schema?: Record<string, unknown>
}
export interface SchemaFC<P = unknown> extends FunctionComponent<P> {
  getSchema?(props: P): SchemaObject<P>
  schema?: SchemaObject<P>
}

interface Widget {
  'ui:widget':
    | 'image-uploader'
    | 'color'
    | 'radio'
    | 'password'
    | 'textarea'
    | 'hidden'
    | 'range'
}

interface CommonType {
  title?: string
  description?: string
  widget?: Widget
  readOnly?: boolean
}

interface BooleanType extends CommonType {
  type: 'boolean'
  default?: boolean
}

interface NumberType extends CommonType {
  type: 'number'
  default?: number
}

interface StringType extends CommonType {
  type: 'string'
  format?: 'RichText'
  enum?: string[]
  enumNames?: string[]
  default?: string
}

interface ArrayType<T> {
  type: 'array'
  minItems?: number
  maxItems?: number
  title?: string
  description?: string
  items: SchemaObject<TypeOfArrayItem<T>>
  default?: T
}

interface ObjectType<T> extends Omit<CommonType, 'widget'> {
  type: 'object'
  properties: Properties<T>
  required?: Array<keyof T>
}

type Properties<T> = { [K in keyof T]: SchemaObject<T[K]> }
type TypeOfArrayItem<T> = T extends Array<infer U> ? U : never

// Define o schema baseado no tipo recebido
export type SchemaObject<T = unknown> = T extends undefined
  ? undefined
  : T extends boolean
  ? BooleanType
  : T extends number
  ? NumberType
  : T extends string
  ? StringType
  : T extends unknown[]
  ? ArrayType<T>
  : ObjectType<T>
