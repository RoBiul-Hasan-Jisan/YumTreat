"use client";

import { useEffect, useState } from "react";
import { FiPackage } from "react-icons/fi";
import AdminGuard from "@/components/AdminGuard";
import { Loader, EmptyState, SectionHeading } from "@/components/UI";
import { getAllOrders, updateOrderStatus } from "@/lib/api";

const STATUSES = ["preparing", "ready", "delivered", "cancel"];

const STATUS_STYLES = {
  preparing: "bg-saffron/20 text-ink-900",
  ready: "bg-ember-500/15 text-ember-700",
  delivered: "bg-emerald-500/15 text-emerald-700",
  cancel: "bg-red-500/10 text-red-700",
};

export default function AdminOrdersPage() {
  return (
    <AdminGuard>
      <OrdersManager />
    </AdminGuard>
  );
}

function OrdersManager() {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("loading");
  const [filter, setFilter] = useState("all");
  const [busyId, setBusyId] = useState(null);

  const load = () => {
    setStatus("loading");
    getAllOrders()
      .then((data) => {
        setOrders(data);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  };

  useEffect(load, []);

  const handleStatusChange = async (id, newStatus) => {
    setBusyId(id);
    try {
      const updated = await updateOrderStatus(id, newStatus);
      setOrders((prev) => prev.map((o) => (o._id === id ? updated : o)));
    } catch {
      // no-op; list stays as-is if the update fails
    } finally {
      setBusyId(null);
    }
  };

  const visibleOrders = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  return (
    <section className="section-pad">
      <div className="container-x">
        <SectionHeading eyebrow="Admin" title="Orders" subtitle="Move orders through the kitchen — customers see status updates instantly." />

        {status === "ready" && orders.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {["all", ...STATUSES].map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`rounded-full px-4 py-2 text-xs font-bold capitalize transition ${
                  filter === s ? "bg-ink-950 text-white" : "bg-ink-900/5 text-ink-900/60 hover:bg-ink-900/10"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <div className="mt-8">
          {status === "loading" && <Loader label="Loading orders…" />}
          {status === "error" && <p className="text-sm text-ember-700">Couldn&apos;t load orders.</p>}
          {status === "ready" && visibleOrders.length === 0 && (
            <EmptyState title="No orders here" subtitle="Nothing matches this filter yet." />
          )}
          {status === "ready" && visibleOrders.length > 0 && (
            <div className="space-y-4">
              {visibleOrders.map((order) => (
                <div key={order._id} className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-black/5">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-900/5 text-ink-900/60">
                        <FiPackage />
                      </span>
                      <div>
                        <p className="font-display font-bold text-ink-950">
                          Order #{order._id.slice(-6).toUpperCase()} · {order.fullName}
                        </p>
                        <p className="text-xs text-ink-900/45">
                          {new Date(order.createdAt).toLocaleString()} · {order.products?.length} item
                          {order.products?.length === 1 ? "" : "s"} · ${order.payed}
                        </p>
                      </div>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${STATUS_STYLES[order.status] || "bg-ink-900/5"}`}>
                      {order.status}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-dashed border-ink-900/10 pt-4">
                    <p className="text-sm text-ink-900/60">
                      Deliver to {order.address}, {order.city} {order.postalCode} · {order.phone}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {STATUSES.map((s) => (
                        <button
                          key={s}
                          disabled={busyId === order._id || order.status === s}
                          onClick={() => handleStatusChange(order._id, s)}
                          className={`rounded-full px-3 py-1.5 text-xs font-bold capitalize transition disabled:cursor-not-allowed ${
                            order.status === s
                              ? "bg-ink-950 text-white"
                              : "bg-ink-900/5 text-ink-900/60 hover:bg-ember-500 hover:text-white"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
