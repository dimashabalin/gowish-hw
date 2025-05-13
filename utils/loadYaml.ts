import fs from 'fs';
import yaml from 'js-yaml';

export function loadYaml(path: string = 'test_data.yml'): Record<string, any> {
  const file = fs.readFileSync(path, 'utf8');

  return yaml.load(file) as Record<string, any>;
}
