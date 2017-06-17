# NumberFormat

## Usage

```
<script src="NumberFormat.js"></script>
<script>
var nf = new NumberFormat();
var nf2 = new NumberFormat({
                            'style':'currency',
                            'currency':'KRW',
                            'currencyDisplay':'symbol',
                            'useIntl':false // Default: true
                        });
</script>
```

Intl 을 지원하는 최신 브라우저에서는 해당 기능을 이용하여 작동합니다.
IE10 이하 브라우저는 Intl 을 지원하지 않습니다.

## License
MIT license