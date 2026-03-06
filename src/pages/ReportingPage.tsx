import { useState } from 'react'

type ActiveTab = 'marketplace' | 'holdings'

function TabStrip({ activeTab, onChange }: { activeTab: ActiveTab; onChange: (t: ActiveTab) => void }) {
  const tabs: { key: ActiveTab; label: string }[] = [
    { key: 'marketplace', label: 'Marketplace' },
    { key: 'holdings',    label: 'My Holdings'  },
  ]
  return (
    <div style={{ flexShrink: 0, padding: '0 24px', marginBottom: 10 }}>
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', gap: 28 }}>
        {tabs.map(tab => (
          <div
            key={tab.key}
            onClick={() => onChange(tab.key)}
            style={{
              position: 'relative',
              padding: '14px 0',
              fontSize: 15,
              fontWeight: 600,
              cursor: 'pointer',
              color: activeTab === tab.key ? 'var(--text)' : 'var(--muted)',
              borderBottom: activeTab === tab.key ? '2px solid var(--brand)' : '2px solid transparent',
              marginBottom: -1,
            }}
          >
            {tab.label}
          </div>
        ))}
      </div>
    </div>
  )
}

function PanelColumn({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      border: '1px solid var(--border)',
      borderRadius: 16,
      background: 'var(--card)',
      boxShadow: 'var(--shadow)',
      overflow: 'hidden',
      height: '100%',
    }}>
      <div style={{
        padding: '14px 20px',
        borderBottom: '1px solid var(--border)',
        background: 'var(--card)',
        flexShrink: 0,
      }}>
        <div style={{ fontWeight: 700, fontSize: 15 }}>{title}</div>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{subtitle}</div>
      </div>
      <div style={{ flex: 1, overflow: 'auto', padding: '16px' }}>
        {children}
      </div>
    </div>
  )
}

function KpiTile({ label, value, onClick }: { label: string; value: string; onClick?: () => void }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--card)',
        borderRadius: 10,
        padding: '10px 14px',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow)',
        cursor: 'pointer',
        flex: 1,
        minWidth: 0,
        transition: 'transform 0.15s',
        transform: hovered ? 'translateY(-2px)' : 'none',
      }}
    >
      <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 500, lineHeight: 1.3 }}>{label}</div>
      <div style={{ fontSize: 18, fontWeight: 700, marginTop: 4 }}>{value}</div>
    </div>
  )
}

function ChartPlaceholder({ label, height = 220 }: { label: string; height?: number }) {
  return (
    <div style={{
      height,
      background: '#f8fafc',
      borderRadius: 10,
      border: '1px dashed var(--border)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: 'var(--muted)', fontSize: 13, marginTop: 12,
    }}>
      {label}
    </div>
  )
}

function RoiColumn() {
  const [activeKpi, setActiveKpi] = useState<string | null>('kpi2')
  const kpis = [
    { key: 'kpi1', label: 'Weighted ROI to Current Month', value: '12.92%' },
    { key: 'kpi2', label: 'Projected Weighted ROI',        value: '50.09%' },
    { key: 'kpi3', label: 'Capital Recovered',             value: '21.51%' },
    { key: 'kpi4', label: 'ROI Spread',                    value: '46.58%' },
  ]
  return (
    <PanelColumn title="Return on Investment" subtitle="Portfolio ROI and projections">
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {kpis.filter(k => k.key !== activeKpi).map(kpi => (
          <KpiTile key={kpi.key} label={kpi.label} value={kpi.value} onClick={() => setActiveKpi(kpi.key)} />
        ))}
      </div>
      {activeKpi && (
        <div style={{ marginTop: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
            <div style={{ fontWeight: 700, fontSize: 14 }}>{kpis.find(k => k.key === activeKpi)?.label}</div>
            <button onClick={() => setActiveKpi(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: 'var(--muted)' }}>×</button>
          </div>
          <ChartPlaceholder label="ROI chart — coming in Step 4" height={200} />
          <ChartPlaceholder label="Projected ROI at Maturity table — coming in Step 4" height={120} />
        </div>
      )}
    </PanelColumn>
  )
}

function EarningsColumn() {
  const [activeKpi, setActiveKpi] = useState<string | null>('kpi2')
  const kpis = [
    { key: 'kpi1', label: 'Net Earnings to Date',           value: '$14,835.20' },
    { key: 'kpi2', label: 'Projected Lifetime Earnings',    value: '$107,818.06' },
    { key: 'kpi3', label: 'Avg Monthly Earnings To Date',   value: '$549.45' },
    { key: 'kpi4', label: 'Projected Avg Monthly Earnings', value: '$669.68' },
  ]
  return (
    <PanelColumn title="Earnings" subtitle="Cash flow and projected returns">
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {kpis.filter(k => k.key !== activeKpi).map(kpi => (
          <KpiTile key={kpi.key} label={kpi.label} value={kpi.value} onClick={() => setActiveKpi(kpi.key)} />
        ))}
      </div>
      {activeKpi && (
        <div style={{ marginTop: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
            <div style={{ fontWeight: 700, fontSize: 14 }}>{kpis.find(k => k.key === activeKpi)?.label}</div>
            <button onClick={() => setActiveKpi(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: 'var(--muted)' }}>×</button>
          </div>
          <ChartPlaceholder label="Earnings chart — coming in Step 5" height={200} />
          <ChartPlaceholder label="Per-loan earnings table — coming in Step 5" height={120} />
        </div>
      )}
    </PanelColumn>
  )
}

function AmortColumn() {
  const [activeKpi, setActiveKpi] = useState<string | null>('kpi1')
  const kpis = [
    { key: 'kpi1', label: 'Total Portfolio Value', value: '$115,424'  },
    { key: 'kpi2', label: 'Avg Rate',              value: '8.79%'     },
    { key: 'kpi3', label: 'Monthly Income',        value: '$1,163.51' },
    { key: 'kpi4', label: 'Total Invested',        value: '$94,500'   },
  ]
  return (
    <PanelColumn title="Loan Amortization" subtitle="Schedules and balances">
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {kpis.filter(k => k.key !== activeKpi).map(kpi => (
          <KpiTile key={kpi.key} label={kpi.label} value={kpi.value} onClick={() => setActiveKpi(kpi.key)} />
        ))}
      </div>
      {activeKpi && (
        <div style={{ marginTop: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
            <div style={{ fontWeight: 700, fontSize: 14 }}>{kpis.find(k => k.key === activeKpi)?.label}</div>
            <button onClick={() => setActiveKpi(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: 'var(--muted)' }}>×</button>
          </div>
          <ChartPlaceholder label="Amort chart — reuses Phase 1 KpiDrawer in Step 6" height={200} />
        </div>
      )}
    </PanelColumn>
  )
}

export default function ReportingPage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('holdings')
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <TabStrip activeTab={activeTab} onChange={setActiveTab} />
      {activeTab === 'marketplace' && (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto' }}>
          <img
            src="https://jeff-stratofied.github.io/loan-dashboard/assets/MarketplaceReporting.png"
            alt="Marketplace"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
      )}
      {activeTab === 'holdings' && (
        <div style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 8,
          padding: '0 16px 16px',
          overflow: 'hidden',
          minHeight: 0,
        }}>
          <RoiColumn />
          <EarningsColumn />
          <AmortColumn />
        </div>
      )}
    </div>
  )
}
