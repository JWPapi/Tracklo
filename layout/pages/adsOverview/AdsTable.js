import { AgGridReact } from 'ag-grid-react'
import { useCallback, useRef } from 'react'
import Image from 'next/image'
import { useWindowSize } from '@reach/window-size'

export default function AdsTable({ data }) {

    const gridRef = useRef()
    const { width } = useWindowSize()
    const sizeToFit = useCallback(() => {
        if (width > 768) {
            gridRef.current['api'].sizeColumnsToFit()
        }
    }, [width])

    const defaultColDef = {
        sortable         : true,
        resizable        : true,
        width            : 150,
        'valueFormatter' : params => typeof params.value !== 'number' ? params.value : params.value.toFixed(2),
        'valueSetter'    : params => params.value === undefined ? '' : params.value,
        filter           : 'agNumberColumnFilter'

    }

    const columnDefs = [
        { field : 'name', width : 300, filter : 'agTextColumnFilter', headerName : 'Name' },
        { field : 'spend', width : 200, headerName : 'Ausgaben' },

        {
            field          : 'count', headerName : 'Bestellungen',
            valueFormatter : params => typeof params === 'number' ? params.value.toFixed(0) : params.value
        },
        { field : 'value', headerName : 'Umsatz' },
        { field : 'cpo', headerName : 'Kosten pro Bestellung' },
        { field : 'roas', headerName : 'Kapitalrendite' },
        { field          : 'inline_link_clicks', headerName : 'Link-Klicks',
            valueFormatter : params => Number(params.value).toFixed(0)
        },
        {
            field          : 'ctr', headerName : 'Klickrate',
            valueFormatter : params => Number(params.value).toFixed(2) + '%'
        },
        { field : 'cpc', headerName : 'Kosten pro Klick' },
    ]

    if (data[0]?.image !== undefined) {
        columnDefs.unshift({
            field          : 'image',
            headerName     : '',
            width          : 100,
            'cellRenderer' : params => {
                if (params.value) {
                    return (
                    <div className="flex items-center h-full">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img className="rounded object-cover w-8 h-8 mx-auto"
                             src={params.value}
                             alt="fb_thumbnail"/>
                    </div>
                    )
                }
                return ( <></> )
            }
        })
    }

    if (data[0]?.adset_name !== undefined && data[0].ad_name !== undefined) {
        columnDefs.splice(2, 0, { field : 'adset_name', headerName : 'Adset Name', width : 300 })
    }

    const serializedData = data.map(row => {
        row.count = row.count ? row.count : 0
        row.spend = row.spend ? Number(row.spend) : 0
        row.value = row.value ? Number(row.value) : 0
        row.cpo = row.spend && row.value ? ( row.spend / row.count ) : 0
        row.roas = ( row.value / row.spend )
        row.cpc = row.spend && row.inline_link_clicks ? ( row.spend / row.inline_link_clicks ) : 0
        return row
    })

    const totalSpend = data.reduce((acc, cur) => acc + cur.spend, 0)
    const totalOrderValue = data.reduce((acc, cur) => acc + cur.value, 0)
    const totalClicks = data.reduce((acc, cur) => acc + cur.inline_link_clicks, 0)
    const totals = [
        {
            name               : 'Totals',
            spend              : totalSpend,
            count              : data.reduce((acc, cur) => acc + cur.count, 0),
            value              : totalOrderValue,
            cpo                : data.reduce((acc, cur) => acc + cur.cpo, 0) / data.length,
            roas               : totalOrderValue / totalSpend,
            inline_link_cliscks : totalClicks,
            ctr                : data.reduce((acc, cur) => acc + Number(cur.ctr), 0) / data.length,
            cpc                : totalSpend / totalClicks
        }
    ]

    return (
    <>
        <div className="flex justify-between  p-4  pr-2 bg-white">
            <h2 className="text-xl font-bold">Werbung Übersicht</h2>
            <Image src={'/icons/excelDownload.svg'}
                   alt="excel download"
                   className="p-8 cursor-pointer bg-white"
                   width={24}
                   height={24}
                   onClick={() => gridRef.current['api'].exportDataAsExcel()}/>
        </div>
        <div className="ag-theme-alpine">
            <AgGridReact ref={gridRef}
                         domLayout="autoHeight"
                         rowData={serializedData}
                         columnDefs={columnDefs}
                         defaultColDef={defaultColDef}
                         onGridReady={sizeToFit}
                         alwaysShowHorizontalScroll={false}
                         pinnedBottomRowData={totals}/>
        </div>
    </>
    )
}

