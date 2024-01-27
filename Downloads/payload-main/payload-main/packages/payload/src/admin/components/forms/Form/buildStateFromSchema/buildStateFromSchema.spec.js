import buildStateFromSchema from './index'

describe('Form - buildStateFromSchema', () => {
  const defaultValue = 'Default'
  it('populates default value - normal fields', async () => {
    const fieldSchema = [
      {
        name: 'text',
        defaultValue,
        label: 'Text',
        type: 'text',
      },
    ]
    const state = await buildStateFromSchema({ fieldSchema })
    expect(state.text.value).toBe(defaultValue)
  })
  it('field value overrides defaultValue - normal fields', async () => {
    const value = 'value'
    const data = { text: value }
    const fieldSchema = [
      {
        name: 'text',
        defaultValue,
        label: 'Text',
        type: 'text',
      },
    ]
    const state = await buildStateFromSchema({ data, fieldSchema })
    expect(state.text.value).toBe(value)
  })
  it('populates default value from a function - normal fields', async () => {
    const user = { email: 'user@example.com' }
    const locale = 'en'
    const fieldSchema = [
      {
        name: 'text',
        defaultValue: (args) => {
          if (!args.locale) {
            return 'missing locale'
          }
          if (!args.user) {
            return 'missing user'
          }
          return 'Default'
        },
        label: 'Text',
        type: 'text',
      },
    ]
    const state = await buildStateFromSchema({ fieldSchema, locale, user })
    expect(state.text.value).toBe(defaultValue)
  })
})
