/* eslint-disable no-restricted-syntax, no-await-in-loop */
import fs from 'fs'

import type { CreateMigration } from '../types'

import { migrationTemplate } from './migrationTemplate'

export const createMigration: CreateMigration = async function createMigration({
  migrationName,
  payload,
}) {
  const dir = payload.db.migrationDir
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }

  const [yyymmdd, hhmmss] = new Date().toISOString().split('T')
  const formattedDate = yyymmdd.replace(/\D/g, '')
  const formattedTime = hhmmss.split('.')[0].replace(/\D/g, '')

  const timestamp = `${formattedDate}_${formattedTime}`

  const formattedName = migrationName.replace(/\W/g, '_')
  const fileName = `${timestamp}_${formattedName}.ts`
  const filePath = `${dir}/${fileName}`
  fs.writeFileSync(filePath, migrationTemplate)
  payload.logger.info({ msg: `Migration created at ${filePath}` })
}
