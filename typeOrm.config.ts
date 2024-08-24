import { typeOrmConfigs } from 'src/config/dbConfig';
import { DataSource } from 'typeorm';

export default new DataSource(typeOrmConfigs());
