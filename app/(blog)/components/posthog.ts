import * as z from 'zod'

export const BreakdownSchema = z.enum(['$pathname'])
export type Breakdown = z.infer<typeof BreakdownSchema>

export const BreakdownTypeEnumSchema = z.enum(['event'])
export type BreakdownTypeEnum = z.infer<typeof BreakdownTypeEnumSchema>

export const DateFromSchema = z.string()
export type DateFrom = z.infer<typeof DateFromSchema>

export const DisplaySchema = z.enum(['ActionsLineGraph'])
export type Display = z.infer<typeof DisplaySchema>

export const EntityTypeEnumSchema = z.enum(['events'])
export type EntityTypeEnum = z.infer<typeof EntityTypeEnumSchema>

export const IdSchema = z.enum(['$pageview'])
export type Id = z.infer<typeof IdSchema>

export const MathSchema = z.enum(['total'])
export type Math = z.infer<typeof MathSchema>

export const InsightSchema = z.enum(['TRENDS'])
export type Insight = z.infer<typeof InsightSchema>

export const IntervalSchema = z.enum(['day'])
export type Interval = z.infer<typeof IntervalSchema>

export const BreakdownAttributionTypeSchema = z.enum(['first_touch'])
export type BreakdownAttributionType = z.infer<typeof BreakdownAttributionTypeSchema>

export const PropertiesTypeSchema = z.enum(['AND'])
export type PropertiesType = z.infer<typeof PropertiesTypeSchema>

export const KeySchema = z.enum(['$host'])
export type Key = z.infer<typeof KeySchema>

export const OperatorSchema = z.enum(['not_regex'])
export type Operator = z.infer<typeof OperatorSchema>

export const ValueEnumSchema = z.string()
export type ValueEnum = z.infer<typeof ValueEnumSchema>

export const LabelSchema = z.string()
export type Label = z.infer<typeof LabelSchema>

export const EdBySchema = z.object({
  id: z.number(),
  uuid: z.string(),
  distinct_id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  is_email_verified: z.boolean(),
})
export type EdBy = z.infer<typeof EdBySchema>

export const DashboardTileSchema = z.object({
  id: z.number(),
  dashboard_id: z.number(),
  deleted: z.null(),
})
export type DashboardTile = z.infer<typeof DashboardTileSchema>

export const EventSchema = z.object({
  id: IdSchema,
  math: MathSchema,
  name: IdSchema,
  type: EntityTypeEnumSchema,
  order: z.number(),
})
export type Event = z.infer<typeof EventSchema>

export const ActionPropertiesSchema = z.object({})
export type ActionProperties = z.infer<typeof ActionPropertiesSchema>

export const ValueElementSchema = z.object({
  key: KeySchema,
  operator: OperatorSchema,
  type: BreakdownTypeEnumSchema,
  value: ValueEnumSchema,
})
export type ValueElement = z.infer<typeof ValueElementSchema>

export const PersonsUrlFilterSchema = z.object({
  entity_id: IdSchema,
  entity_type: EntityTypeEnumSchema,
  entity_math: MathSchema,
  date_from: z.coerce.date(),
  date_to: z.coerce.date(),
  breakdown_value: z.string(),
  breakdown_type: BreakdownTypeEnumSchema,
})
export type PersonsUrlFilter = z.infer<typeof PersonsUrlFilterSchema>

export const FiltersSchema = z.object({
  events: z.array(EventSchema),
  display: DisplaySchema,
  insight: InsightSchema,
  interval: IntervalSchema,
  breakdown: BreakdownSchema,
  date_from: DateFromSchema,
  entity_type: EntityTypeEnumSchema,
  breakdown_type: BreakdownTypeEnumSchema,
  filter_test_accounts: z.boolean(),
  breakdown_normalize_url: z.boolean(),
})
export type Filters = z.infer<typeof FiltersSchema>

export const ActionSchema = z.object({
  id: IdSchema,
  type: EntityTypeEnumSchema,
  order: z.number(),
  name: IdSchema,
  custom_name: z.null(),
  math: MathSchema,
  math_property: z.null(),
  math_hogql: z.null(),
  math_group_type_index: z.null(),
  properties: ActionPropertiesSchema,
})
export type Action = z.infer<typeof ActionSchema>

export const FilterPropertiesSchema = z.object({
  type: PropertiesTypeSchema,
  values: z.array(ValueElementSchema),
})
export type FilterProperties = z.infer<typeof FilterPropertiesSchema>

export const PersonsUrlSchema = z.object({
  filter: PersonsUrlFilterSchema,
  url: z.string(),
})
export type PersonsUrl = z.infer<typeof PersonsUrlSchema>

export const ResultFilterSchema = z.object({
  breakdown: BreakdownSchema,
  breakdown_attribution_type: BreakdownAttributionTypeSchema,
  breakdown_normalize_url: z.boolean(),
  breakdown_type: BreakdownTypeEnumSchema,
  date_from: DateFromSchema,
  display: DisplaySchema,
  events: z.array(ActionSchema),
  entity_type: EntityTypeEnumSchema,
  insight: InsightSchema,
  interval: IntervalSchema,
  properties: FilterPropertiesSchema,
  sampling_factor: z.string(),
  smoothing_intervals: z.number(),
})
export type ResultFilter = z.infer<typeof ResultFilterSchema>

export const ResultSchema = z.object({
  action: ActionSchema,
  label: z.string(),
  count: z.number(),
  data: z.array(z.number()),
  labels: z.array(LabelSchema),
  days: z.array(z.string()),
  breakdown_value: z.string(),
  persons_urls: z.array(PersonsUrlSchema),
  filter: ResultFilterSchema,
})
export type Result = z.infer<typeof ResultSchema>

export const PosthogSchema = z.object({
  id: z.number(),
  short_id: z.string(),
  name: z.string(),
  derived_name: z.string(),
  filters: FiltersSchema,
  query: z.null(),
  order: z.null(),
  deleted: z.boolean(),
  dashboards: z.array(z.number()),
  dashboard_tiles: z.array(DashboardTileSchema),
  last_refresh: z.coerce.date(),
  next_allowed_client_refresh: z.coerce.date(),
  result: z.array(ResultSchema),
  created_at: z.coerce.date(),
  created_by: EdBySchema,
  description: z.string(),
  updated_at: z.coerce.date(),
  favorited: z.boolean(),
  saved: z.boolean(),
  last_modified_at: z.coerce.date(),
  last_modified_by: EdBySchema,
  is_sample: z.boolean(),
  effective_restriction_level: z.number(),
  effective_privilege_level: z.number(),
  timezone: z.null(),
  is_cached: z.boolean(),
  tags: z.array(z.any()),
  filters_hash: z.string(),
})
export type Posthog = z.infer<typeof PosthogSchema>
