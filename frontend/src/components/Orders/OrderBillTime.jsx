import React from 'react'

const OrderBillTime = ({ orderTime, payed, orderID }) => {
    return (
        <div className='flex flex-wrap items-center justify-between gap-2 text-sm'>
            <p className="font-medium text-[var(--color-ink)]">Order ID: <span className="uppercase text-[var(--color-ink-soft)]">{orderID.slice(-6)}</span></p>
            <p className="font-medium text-[var(--color-ink)]">
                Bill: <strong className="text-[var(--color-accent)]">${parseFloat(payed).toFixed(2)}</strong>
            </p>
            <p className="font-medium text-[var(--color-ink-soft)]">
                <span>Ordered at: </span>
                {new Date(orderTime).toLocaleString('en-US', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })}
            </p>
        </div>
    )
}

export default OrderBillTime;