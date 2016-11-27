# `unicode-ranger-cli`
## Generates valid unicode ranges for use in the unicode-ranges CSS property, or font subsetting with pyftsubset by reading the content of a document. Uses [`unicode-ranger`](https://npmjs.com/package/unicode-ranger).

Ever wanted to examine the content of a URL (or URLs) and get unicode ranges that you can use in a CSS `unicode-range` statement? Or for font subsetting? Now you can.

## Usage and examples
Using `unicode-ranger` is very easy:

```
unicode-ranger [url]
```

If you only have one URL, just pass it in:

```
unicode-ranger https://example.com
```

This command will produce output similar to something below:

```
U+A,U+20,U+2E,U+44-45,U+4D,U+54,U+59,U+61-69,U+6B-70,U+72-79
```

For multiple URLs, place URLs into a text file (one URL per line), and specify the file instead of a URL:

```
unicode-ranger urls.txt
```

## Subsetting

If you have `pyftsubset` installed from the [`fonttools`](https://github.com/fonttools/fonttools) Python package, you can use the output of this program to subset a font like so:

```
pyftsubset font.ttf --unicodes=`echo $(unicode-ranger https://example.com)` --output-file=font.ttf --name-IDs='*'
```

## Contributing/whatever

This program is just a CLI interface for `unicode-ranger`, so if there are problems with the program, they're likely due to problems in the underlying module, so [log an issue over there](https://github.com/malchata/unicode-ranger/issues). If you want to contribute, just fork this CLI (or the module) and send me a PR and I'll review it.

## Special thanks
Thanks to both [Ben Briggs](https://twitter.com/ben_eb) and [Ray Nicholus](https://twitter.com/RayNicholus) for their help with some snags I hit. Check them out on twitter!