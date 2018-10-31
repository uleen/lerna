const fs = require('fs');
const path = require('path');
const pkg = require('../package.json');
const yamlParse = require('js-yaml');

const output = path.resolve(__dirname, '..', 'dist');

// Types
const tokens = {
    colors: getTokens('colors'),
    layout: getTokens('layout'),
    font: getTokens('font')
};

// Sets formats for specific files
const formats = {
    js: {
        body: (body, pkg) => [`/* CashWagon Design System Tokens v${pkg.version} */\n${body}`],
        formatter: (data) => {
            return `exports = ${JSON.stringify(data, null, 4)};\n`;
        }
    },
    json: {
        body: (body, pkg) => [`${body}`],
        formatter: (data) => {
            return `${JSON.stringify(data, null, 2)}\n`;
        }
    },
    css: {
        body: (body, pkg) => [`/* CashWagon Design System Tokens v${pkg.version} */\n:root {\n${body}\n}\n`],
        formatter: (data) => {
            const variant = function fn(name, variant, value) {
                if (typeof value === 'object') {
                    return Object.keys(value).map((key) => {
                        return fn(`${name}-${variant}`, key, value[key]);
                    }).join('');
                }

                return `  --${name}-${variant}: ${value};\n`;
            };

            return Object.keys(data).reduce((result, type) => {
                const values = data[type];

                Object.keys(values).map((item) => {
                    result.push(variant(type, item, values[item]));
                });

                return result;
            }, []).join('\n');
        }
    }
};

// Checked dist directory
if (!fs.existsSync(output)) {
    fs.mkdirSync(output);
}

// Process create token
for (const format in formats) {
    const setting = formats[format];
    const t = formating(tokens);

    const content = setting.body(setting.formatter(t), pkg).join('\n');
    const filepath = path.join(output, 'tokens.' + format);

    fs.writeFile(filepath, content, (err) => {
        if (err) throw err;

        console.log(`Successfully built tokens.${format}`);
    });
}

/**
 * Get tokens from yaml file
 *
 * @param {string} filename The filename
 * @returns {Object} Returns object from yaml
 */
function getTokens(filename) {
    const tokens = fs.readFileSync(path.resolve(__dirname, '../src', filename + '.yaml'), 'utf8');
    return yamlParse.safeLoad(tokens);
}

/**
 * Remove `value` structure
 *
 * @param {Object} source The source
 * @returns {Object} The simple structure data
 */
function formating(source) {
    if (typeof source !== 'object') {
        return source;
    }

    const result = {};

    Object.keys(source).forEach(function(key) {
        if (typeof source[key] === 'object' && 'value' in source[key]) {
            result[key] = source[key].value;
        } else {
            result[key] = formating(source[key]);
        }
    });

    return result;
};
