import {readdirSync} from 'fs';
import {join} from 'path'
export function getConfigureModule(filename: string): string {
    const files = readdirSync( process.cwd() );
    return join(process.cwd(), files.find( file => file.match(new RegExp(`${filename}`, 'gm'))).replace('.js', ''));
}