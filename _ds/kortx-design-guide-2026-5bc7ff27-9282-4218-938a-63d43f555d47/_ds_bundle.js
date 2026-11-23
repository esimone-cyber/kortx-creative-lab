/* @ds-bundle: {"format":4,"namespace":"KORTXDesignSystem_a22685","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Divider","sourcePath":"components/core/Divider.jsx"},{"name":"Eyebrow","sourcePath":"components/core/Eyebrow.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Logo","sourcePath":"components/core/Logo.jsx"},{"name":"LogoLockup","sourcePath":"components/core/Logo.jsx"},{"name":"DataTable","sourcePath":"components/data/DataTable.jsx"},{"name":"DeltaBadge","sourcePath":"components/data/DeltaBadge.jsx"},{"name":"LineChart","sourcePath":"components/data/LineChart.jsx"},{"name":"MetricTile","sourcePath":"components/data/MetricTile.jsx"},{"name":"ProgressBar","sourcePath":"components/data/ProgressBar.jsx"},{"name":"Tabs","sourcePath":"components/data/Tabs.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"SegmentedControl","sourcePath":"components/forms/SegmentedControl.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Breadcrumbs","sourcePath":"components/navigation/Breadcrumbs.jsx"},{"name":"SidebarNav","sourcePath":"components/navigation/SidebarNav.jsx"},{"name":"NavItem","sourcePath":"components/navigation/SidebarNav.jsx"},{"name":"TopBar","sourcePath":"components/navigation/TopBar.jsx"},{"name":"AccentBullet","sourcePath":"components/patterns/AccentBullet.jsx"},{"name":"FeaturePill","sourcePath":"components/patterns/FeaturePill.jsx"},{"name":"IconTile","sourcePath":"components/patterns/IconTile.jsx"},{"name":"NumberedCard","sourcePath":"components/patterns/NumberedCard.jsx"},{"name":"StatCard","sourcePath":"components/patterns/StatCard.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"a6c7d7de23f4","components/core/Button.jsx":"db15b8b77032","components/core/Card.jsx":"bca4c88c6743","components/core/Divider.jsx":"3e8f668e61ed","components/core/Eyebrow.jsx":"cbda47a2f775","components/core/IconButton.jsx":"2c9dca13452d","components/core/Logo.jsx":"e39beb87eefd","components/data/DataTable.jsx":"eadb0c91df4f","components/data/DeltaBadge.jsx":"4654486cee2f","components/data/LineChart.jsx":"9bd69f155dcf","components/data/MetricTile.jsx":"b78b25c064da","components/data/ProgressBar.jsx":"93bcaf3c3e35","components/data/Tabs.jsx":"1c772eb9262b","components/forms/Checkbox.jsx":"8b0ae86fdf47","components/forms/Input.jsx":"865d2732d5aa","components/forms/SegmentedControl.jsx":"c161b3c60ab7","components/forms/Select.jsx":"cc930397bd3b","components/forms/Switch.jsx":"a2f41430e5a4","components/navigation/Breadcrumbs.jsx":"6aac030de274","components/navigation/SidebarNav.jsx":"ea9e6e6db386","components/navigation/TopBar.jsx":"2bd3f3a40146","components/patterns/AccentBullet.jsx":"f38ed3389552","components/patterns/FeaturePill.jsx":"6b510c95829a","components/patterns/IconTile.jsx":"a2773f703315","components/patterns/NumberedCard.jsx":"7b2eabc50176","components/patterns/StatCard.jsx":"99fb36db117d","ui_kits/kampus/KampusShell.jsx":"ae9acb122e8a","ui_kits/kampus/PerformanceDetail.jsx":"348070b060f7","ui_kits/kampus/ReportingScreen.jsx":"c187f83afb16","ui_kits/kampus/data.js":"dc0d70dfd913"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.KORTXDesignSystem_a22685 = window.KORTXDesignSystem_a22685 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const tones = {
  neutral: {
    bg: 'var(--action-secondary-bg)',
    fg: 'var(--text-secondary)',
    bd: 'var(--border-subtle)'
  },
  accent: {
    bg: 'rgba(0,204,255,.14)',
    fg: 'var(--blue-300)',
    bd: 'rgba(0,204,255,.28)'
  },
  success: {
    bg: 'var(--success-100)',
    fg: 'var(--success-500)',
    bd: 'transparent'
  },
  warning: {
    bg: 'var(--warning-100)',
    fg: '#B54708',
    bd: 'transparent'
  },
  danger: {
    bg: 'var(--danger-100)',
    fg: 'var(--danger-500)',
    bd: 'transparent'
  },
  lime: {
    bg: 'rgba(190,242,100,.14)',
    fg: 'var(--lime-300)',
    bd: 'rgba(190,242,100,.3)'
  }
};
function Badge({
  tone = 'neutral',
  children,
  style,
  ...rest
}) {
  const t = tones[tone];
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--space-1)',
      height: 22,
      padding: '0 var(--space-2)',
      borderRadius: 'var(--radius-pill)',
      background: t.bg,
      color: t.fg,
      border: '1px solid ' + t.bd,
      font: 'var(--type-label)',
      fontSize: 'var(--fs-caption)',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const base = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 'var(--space-2)',
  fontFamily: 'var(--font-display)',
  fontWeight: 'var(--fw-semibold)',
  letterSpacing: 'var(--ls-body)',
  borderRadius: 'var(--radius-pill)',
  border: '1px solid transparent',
  cursor: 'pointer',
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  transition: 'var(--transition-control)'
};
const sizes = {
  sm: {
    height: 32,
    padding: '0 var(--space-4)',
    fontSize: 'var(--fs-body-sm)'
  },
  md: {
    height: 40,
    padding: '0 var(--space-6)',
    fontSize: 'var(--fs-body-md)'
  },
  lg: {
    height: 52,
    padding: '0 var(--space-8)',
    fontSize: 'var(--fs-body-lg)'
  }
};
const variants = {
  primary: {
    background: 'var(--action-primary-bg)',
    color: 'var(--action-primary-fg)'
  },
  secondary: {
    background: 'var(--action-secondary-bg)',
    color: 'var(--action-secondary-fg)',
    borderColor: 'var(--border-default)'
  },
  outline: {
    background: 'transparent',
    color: 'var(--text-accent)',
    borderColor: 'var(--border-strong)'
  },
  ghost: {
    background: 'transparent',
    color: 'var(--text-secondary)'
  }
};
const hovers = {
  primary: {
    background: 'var(--action-primary-bg-hover)'
  },
  secondary: {
    background: 'var(--action-secondary-bg-hover)'
  },
  outline: {
    background: 'rgba(0,204,255,.10)',
    color: 'var(--blue-300)'
  },
  ghost: {
    background: 'var(--action-secondary-bg)',
    color: 'var(--text-primary)'
  }
};
function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  iconLeft,
  iconRight,
  href,
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [down, setDown] = React.useState(false);
  const Tag = href ? 'a' : 'button';
  const s = {
    ...base,
    ...sizes[size],
    ...variants[variant],
    ...(hover && !disabled ? hovers[variant] : null),
    width: fullWidth ? '100%' : undefined,
    opacity: disabled ? 0.4 : 1,
    pointerEvents: disabled ? 'none' : undefined,
    transform: down ? 'scale(var(--press-scale))' : 'none',
    ...style
  };
  return /*#__PURE__*/React.createElement(Tag, _extends({
    href: href,
    disabled: Tag === 'button' ? disabled : undefined,
    style: s,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setDown(false);
    },
    onMouseDown: () => setDown(true),
    onMouseUp: () => setDown(false)
  }, rest), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Card({
  tone = 'dark',
  glow = false,
  padding = 'var(--space-6)',
  hoverable = false,
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const dark = tone === 'dark';
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: 'relative',
      borderRadius: 'var(--radius-lg)',
      padding,
      background: dark ? 'var(--surface-card)' : 'var(--gray-0)',
      border: '1px solid ' + (dark ? 'var(--border-subtle)' : 'var(--gray-200)'),
      boxShadow: glow ? 'var(--glow-accent-soft),' + (dark ? 'var(--shadow-card-dark)' : 'var(--shadow-card-light)') : dark ? 'var(--shadow-card-dark)' : 'var(--shadow-card-light)',
      color: dark ? 'var(--kortx-white)' : 'var(--gray-900)',
      transform: hoverable && hover ? 'translateY(-2px)' : 'none',
      transition: 'transform var(--dur-base) var(--ease-out),box-shadow var(--dur-base) var(--ease-standard)',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Divider.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Divider({
  orientation = 'horizontal',
  inset = 0,
  style,
  ...rest
}) {
  const h = orientation === 'horizontal';
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "separator",
    style: {
      background: 'var(--border-subtle)',
      width: h ? 'auto' : 1,
      height: h ? 1 : 'auto',
      alignSelf: 'stretch',
      marginLeft: h ? inset : 0,
      marginRight: h ? inset : 0,
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Divider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Divider.jsx", error: String((e && e.message) || e) }); }

// components/core/Eyebrow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Eyebrow({
  tone = 'lime',
  align = 'left',
  children,
  style,
  ...rest
}) {
  const color = tone === 'lime' ? 'var(--lime-300)' : tone === 'accent' ? 'var(--blue-400)' : 'var(--text-tertiary)';
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      font: 'var(--type-eyebrow)',
      letterSpacing: 'var(--ls-eyebrow)',
      textTransform: 'uppercase',
      color,
      textAlign: align,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function IconButton({
  size = 'md',
  variant = 'ghost',
  label,
  active = false,
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const dim = {
    sm: 28,
    md: 34,
    lg: 40
  }[size];
  const bg = active ? 'var(--action-secondary-bg-hover)' : hover ? 'var(--action-secondary-bg)' : variant === 'solid' ? 'var(--action-secondary-bg)' : 'transparent';
  return /*#__PURE__*/React.createElement("button", _extends({
    "aria-label": label,
    title: label,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: dim,
      height: dim,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 'var(--radius-md)',
      border: variant === 'solid' ? '1px solid var(--border-subtle)' : '1px solid transparent',
      background: bg,
      color: active ? 'var(--text-accent)' : 'var(--text-secondary)',
      cursor: 'pointer',
      transition: 'var(--transition-control)',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Logo.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const BASE = '/assets/logo';
function Logo({
  kind = 'wordmark',
  color = 'white',
  height = 28,
  src,
  alt = 'KORTX',
  style,
  ...rest
}) {
  const file = src || `${BASE}/kortx-${kind}-${color}.svg`;
  return /*#__PURE__*/React.createElement("img", _extends({
    src: file,
    alt: alt,
    style: {
      height,
      width: 'auto',
      display: 'block',
      ...style
    }
  }, rest));
}
function LogoLockup({
  label,
  color = 'white',
  height = 24,
  src,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-3)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(Logo, {
    kind: "wordmark",
    color: color,
    height: height,
    src: src
  }), label ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-label)',
      fontSize: 'var(--fs-body-md)',
      color: 'var(--text-primary)',
      opacity: .9
    }
  }, label) : null);
}
Object.assign(__ds_scope, { Logo, LogoLockup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Logo.jsx", error: String((e && e.message) || e) }); }

// components/data/DataTable.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function DataTable({
  columns = [],
  rows = [],
  tone = 'light',
  style,
  ...rest
}) {
  const light = tone === 'light';
  const bd = light ? 'var(--gray-200)' : 'var(--border-subtle)';
  const th = {
    textAlign: 'right',
    padding: 'var(--space-3) var(--space-4)',
    font: 'var(--type-body)',
    fontSize: 'var(--fs-caption)',
    fontWeight: 'var(--fw-medium)',
    color: light ? 'var(--gray-500)' : 'var(--text-tertiary)',
    borderBottom: '1px solid ' + bd,
    whiteSpace: 'nowrap'
  };
  return /*#__PURE__*/React.createElement("table", _extends({
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, columns.map((c, i) => /*#__PURE__*/React.createElement("th", {
    key: c.key || i,
    style: {
      ...th,
      textAlign: i === 0 ? 'left' : 'right',
      width: c.width
    }
  }, c.label)))), /*#__PURE__*/React.createElement("tbody", null, rows.map((r, ri) => /*#__PURE__*/React.createElement("tr", {
    key: ri
  }, columns.map((c, ci) => /*#__PURE__*/React.createElement("td", {
    key: c.key || ci,
    style: {
      padding: 'var(--space-3) var(--space-4)',
      borderBottom: '1px solid ' + bd,
      textAlign: ci === 0 ? 'left' : 'right',
      font: 'var(--type-body)',
      fontSize: 'var(--fs-body-sm)',
      color: light ? 'var(--gray-800)' : 'var(--text-primary)'
    }
  }, r[c.key]))))));
}
Object.assign(__ds_scope, { DataTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/DataTable.jsx", error: String((e && e.message) || e) }); }

// components/data/DeltaBadge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function DeltaBadge({
  value,
  direction = 'up',
  style,
  ...rest
}) {
  const up = direction === 'up';
  const flat = direction === 'flat';
  const fg = flat ? 'var(--gray-500)' : up ? 'var(--success-500)' : 'var(--danger-500)';
  const bg = flat ? 'var(--gray-100)' : up ? 'var(--success-100)' : 'var(--danger-100)';
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 3,
      height: 20,
      padding: '0 6px',
      borderRadius: 'var(--radius-sm)',
      background: bg,
      color: fg,
      font: 'var(--type-label)',
      fontSize: 'var(--fs-micro)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true,
    style: {
      fontSize: 9
    }
  }, flat ? '\u2192' : up ? '\u2197' : '\u2198'), value);
}
Object.assign(__ds_scope, { DeltaBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/DeltaBadge.jsx", error: String((e && e.message) || e) }); }

// components/data/LineChart.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function LineChart({
  series = [],
  labels = [],
  height = 200,
  yTicks = 5,
  tone = 'light',
  style,
  ...rest
}) {
  const light = tone === 'light';
  const w = 1000,
    h = height,
    padL = 34,
    padB = 22,
    padT = 8,
    padR = 6;
  const all = series.flatMap(s => s.data);
  const max = Math.max(1, ...all),
    maxR = Math.ceil(max / 10) * 10;
  const x = i => padL + i * (w - padL - padR) / Math.max(1, labels.length - 1);
  const y = v => padT + (1 - v / maxR) * (h - padT - padB);
  const grid = light ? 'var(--gray-200)' : 'rgba(255,255,255,.08)';
  const axis = light ? 'var(--gray-400)' : 'var(--text-tertiary)';
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: `0 0 ${w} ${h}`,
    width: "100%",
    height: height,
    style: {
      display: 'block',
      overflow: 'visible',
      ...style
    }
  }, rest), Array.from({
    length: yTicks + 1
  }).map((_, i) => {
    const v = maxR / yTicks * i;
    return /*#__PURE__*/React.createElement("g", {
      key: i
    }, /*#__PURE__*/React.createElement("line", {
      x1: padL,
      x2: w - padR,
      y1: y(v),
      y2: y(v),
      stroke: grid,
      strokeDasharray: "3 4"
    }), /*#__PURE__*/React.createElement("text", {
      x: padL - 8,
      y: y(v) + 4,
      textAnchor: "end",
      fill: axis,
      fontSize: "11",
      fontFamily: "var(--font-body)"
    }, Math.round(v)));
  }), series.map((s, si) => {
    const pts = s.data.map((v, i) => [x(i), y(v)]);
    const d = pts.map((p, i) => (i ? 'L' : 'M') + p[0] + ' ' + p[1]).join(' ');
    const area = d + ` L ${pts[pts.length - 1][0]} ${y(0)} L ${pts[0][0]} ${y(0)} Z`;
    const c = s.color || (si ? 'var(--violet-500)' : 'var(--blue-400)');
    return /*#__PURE__*/React.createElement("g", {
      key: s.name || si
    }, /*#__PURE__*/React.createElement("path", {
      d: area,
      fill: c,
      opacity: ".12"
    }), /*#__PURE__*/React.createElement("path", {
      d: d,
      fill: "none",
      stroke: c,
      strokeWidth: "2",
      strokeLinejoin: "round"
    }), pts.map((p, i) => /*#__PURE__*/React.createElement("circle", {
      key: i,
      cx: p[0],
      cy: p[1],
      r: "3",
      fill: c
    })));
  }), labels.map((l, i) => /*#__PURE__*/React.createElement("text", {
    key: i,
    x: x(i),
    y: h - 6,
    textAnchor: "middle",
    fill: axis,
    fontSize: "11",
    fontFamily: "var(--font-body)"
  }, l)));
}
Object.assign(__ds_scope, { LineChart });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/LineChart.jsx", error: String((e && e.message) || e) }); }

// components/data/MetricTile.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function MetricTile({
  label,
  value,
  delta,
  tone = 'light',
  style,
  ...rest
}) {
  const light = tone === 'light';
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      flex: 1,
      minWidth: 0,
      padding: 'var(--space-4) var(--space-5)',
      borderRadius: 'var(--radius-lg)',
      background: light ? 'var(--gray-0)' : 'var(--surface-card)',
      border: '1px solid ' + (light ? 'var(--gray-200)' : 'var(--border-subtle)'),
      boxShadow: light ? 'var(--shadow-card-light)' : 'var(--shadow-card-dark)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 'var(--space-3)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-body)',
      fontSize: 'var(--fs-body-sm)',
      color: light ? 'var(--gray-500)' : 'var(--text-tertiary)'
    }
  }, label), delta), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-2)',
      font: 'var(--type-page-title)',
      fontSize: 'var(--fs-title-lg)',
      letterSpacing: 'var(--ls-title)',
      color: light ? 'var(--gray-900)' : 'var(--kortx-white)'
    }
  }, value));
}
Object.assign(__ds_scope, { MetricTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/MetricTile.jsx", error: String((e && e.message) || e) }); }

// components/data/ProgressBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ProgressBar({
  value = 0,
  label,
  tone = 'light',
  style,
  ...rest
}) {
  const light = tone === 'light';
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      ...style
    }
  }, rest), label ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 'var(--space-2)',
      font: 'var(--type-body)',
      fontSize: 'var(--fs-caption)',
      color: light ? 'var(--gray-500)' : 'var(--text-tertiary)'
    }
  }, /*#__PURE__*/React.createElement("span", null, label), /*#__PURE__*/React.createElement("span", null, Math.round(value), "%")) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 6,
      borderRadius: 'var(--radius-pill)',
      overflow: 'hidden',
      background: light ? 'var(--gray-200)' : 'rgba(255,255,255,.10)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: Math.max(0, Math.min(100, value)) + '%',
      height: '100%',
      borderRadius: 'var(--radius-pill)',
      background: 'linear-gradient(90deg,var(--blue-500),var(--blue-300))',
      transition: 'width var(--dur-slow) var(--ease-out)'
    }
  })));
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/data/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Tabs({
  items = [],
  value,
  onChange,
  tone = 'light',
  style,
  ...rest
}) {
  const light = tone === 'light';
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "tablist",
    style: {
      display: 'flex',
      gap: 'var(--space-6)',
      borderBottom: '1px solid ' + (light ? 'var(--gray-200)' : 'var(--border-subtle)'),
      ...style
    }
  }, rest), items.map(it => {
    const v = it.value ?? it,
      l = it.label ?? it,
      on = v === value;
    return /*#__PURE__*/React.createElement("button", {
      key: v,
      role: "tab",
      "aria-selected": on,
      onClick: () => onChange && onChange(v),
      style: {
        border: 0,
        background: 'transparent',
        cursor: 'pointer',
        padding: '0 0 var(--space-3)',
        borderBottom: '2px solid ' + (on ? 'var(--blue-400)' : 'transparent'),
        marginBottom: -1,
        font: 'var(--type-label)',
        fontSize: 'var(--fs-body-sm)',
        color: on ? light ? 'var(--blue-500)' : 'var(--blue-400)' : light ? 'var(--gray-500)' : 'var(--text-tertiary)',
        transition: 'var(--transition-control)'
      }
    }, l);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Checkbox({
  label,
  checked = false,
  onChange,
  tone = 'light',
  style,
  ...rest
}) {
  const light = tone === 'light';
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--space-3)',
      cursor: 'pointer',
      font: 'var(--type-body)',
      fontSize: 'var(--fs-body-sm)',
      color: light ? 'var(--gray-800)' : 'var(--text-primary)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    checked: checked,
    onChange: onChange,
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0
    }
  }, rest)), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true,
    style: {
      width: 18,
      height: 18,
      flex: '0 0 18px',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 'var(--radius-xs)',
      background: checked ? 'var(--blue-400)' : light ? 'var(--gray-0)' : 'rgba(255,255,255,.04)',
      border: '1px solid ' + (checked ? 'var(--blue-400)' : light ? 'var(--gray-300)' : 'var(--border-default)'),
      color: 'var(--navy-1000)',
      fontSize: 12,
      fontWeight: 700,
      transition: 'var(--transition-control)'
    }
  }, checked ? '\u2713' : ''), label);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Input({
  label,
  hint,
  error,
  iconLeft,
  tone = 'light',
  style,
  wrapperStyle,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const light = tone === 'light';
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'block',
      ...wrapperStyle
    }
  }, label ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      font: 'var(--type-label)',
      fontSize: 'var(--fs-body-sm)',
      color: light ? 'var(--gray-700)' : 'var(--text-secondary)',
      marginBottom: 'var(--space-2)'
    }
  }, label) : null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-2)',
      height: 40,
      padding: '0 var(--space-3)',
      borderRadius: 'var(--radius-md)',
      background: light ? 'var(--gray-0)' : 'rgba(255,255,255,.04)',
      border: '1px solid ' + (error ? 'var(--danger-500)' : focus ? 'var(--blue-400)' : light ? 'var(--gray-300)' : 'var(--border-default)'),
      boxShadow: focus ? '0 0 0 3px var(--focus-ring)' : light ? 'var(--shadow-card-light)' : 'none',
      transition: 'var(--transition-control)'
    }
  }, iconLeft ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--gray-400)',
      display: 'inline-flex'
    }
  }, iconLeft) : null, /*#__PURE__*/React.createElement("input", _extends({
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      minWidth: 0,
      border: 0,
      outline: 'none',
      background: 'transparent',
      font: 'var(--type-body)',
      fontSize: 'var(--fs-body-sm)',
      color: light ? 'var(--gray-900)' : 'var(--kortx-white)',
      ...style
    }
  }, rest))), hint || error ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      marginTop: 'var(--space-2)',
      font: 'var(--type-body)',
      fontSize: 'var(--fs-caption)',
      color: error ? 'var(--danger-500)' : light ? 'var(--gray-500)' : 'var(--text-tertiary)'
    }
  }, error || hint) : null);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/SegmentedControl.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function SegmentedControl({
  options = [],
  value,
  onChange,
  tone = 'light',
  size = 'md',
  style,
  ...rest
}) {
  const light = tone === 'light';
  const h = size === 'sm' ? 28 : 34;
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "tablist",
    style: {
      display: 'inline-flex',
      gap: 2,
      padding: 3,
      borderRadius: 'var(--radius-md)',
      background: light ? 'var(--gray-100)' : 'rgba(255,255,255,.05)',
      border: '1px solid ' + (light ? 'var(--gray-200)' : 'var(--border-subtle)'),
      ...style
    }
  }, rest), options.map(o => {
    const v = o.value ?? o,
      l = o.label ?? o,
      on = v === value;
    return /*#__PURE__*/React.createElement("button", {
      key: v,
      role: "tab",
      "aria-selected": on,
      onClick: () => onChange && onChange(v),
      style: {
        height: h,
        padding: '0 var(--space-4)',
        border: 0,
        borderRadius: 'var(--radius-sm)',
        cursor: 'pointer',
        background: on ? light ? 'var(--gray-0)' : 'rgba(255,255,255,.12)' : 'transparent',
        boxShadow: on && light ? 'var(--shadow-card-light)' : 'none',
        font: 'var(--type-label)',
        fontSize: 'var(--fs-body-sm)',
        fontWeight: on ? 'var(--fw-semibold)' : 'var(--fw-medium)',
        color: on ? light ? 'var(--gray-900)' : 'var(--kortx-white)' : light ? 'var(--gray-500)' : 'var(--text-tertiary)',
        transition: 'var(--transition-control)'
      }
    }, l);
  }));
}
Object.assign(__ds_scope, { SegmentedControl });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/SegmentedControl.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Select({
  label,
  options = [],
  value,
  onChange,
  tone = 'light',
  style,
  wrapperStyle,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const light = tone === 'light';
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-block',
      ...wrapperStyle
    }
  }, label ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      font: 'var(--type-label)',
      fontSize: 'var(--fs-body-sm)',
      color: light ? 'var(--gray-700)' : 'var(--text-secondary)',
      marginBottom: 'var(--space-2)'
    }
  }, label) : null, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    value: value,
    onChange: onChange,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      appearance: 'none',
      height: 38,
      padding: '0 var(--space-8) 0 var(--space-3)',
      borderRadius: 'var(--radius-md)',
      background: light ? 'var(--gray-0)' : 'rgba(255,255,255,.04)',
      border: '1px solid ' + (focus ? 'var(--blue-400)' : light ? 'var(--gray-300)' : 'var(--border-default)'),
      boxShadow: light ? 'var(--shadow-card-light)' : 'none',
      font: 'var(--type-body)',
      fontSize: 'var(--fs-body-sm)',
      color: light ? 'var(--gray-900)' : 'var(--kortx-white)',
      cursor: 'pointer',
      transition: 'var(--transition-control)',
      ...style
    }
  }, rest), options.map(o => /*#__PURE__*/React.createElement("option", {
    key: o.value ?? o,
    value: o.value ?? o
  }, o.label ?? o))), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true,
    style: {
      position: 'absolute',
      right: 12,
      pointerEvents: 'none',
      color: 'var(--gray-400)',
      fontSize: 10,
      lineHeight: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", null, "\u25B2"), /*#__PURE__*/React.createElement("span", null, "\u25BC"))));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Switch({
  checked = false,
  onChange,
  label,
  tone = 'light',
  style,
  ...rest
}) {
  const light = tone === 'light';
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--space-3)',
      cursor: 'pointer',
      font: 'var(--type-body)',
      fontSize: 'var(--fs-body-sm)',
      color: light ? 'var(--gray-800)' : 'var(--text-primary)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    role: "switch",
    checked: checked,
    onChange: onChange,
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0
    }
  }, rest)), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true,
    style: {
      width: 38,
      height: 22,
      borderRadius: 'var(--radius-pill)',
      padding: 2,
      background: checked ? 'var(--blue-400)' : light ? 'var(--gray-300)' : 'rgba(255,255,255,.16)',
      transition: 'background-color var(--dur-base) var(--ease-standard)',
      display: 'inline-flex'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 18,
      height: 18,
      borderRadius: 'var(--radius-pill)',
      background: 'var(--gray-0)',
      transform: checked ? 'translateX(16px)' : 'translateX(0)',
      transition: 'transform var(--dur-base) var(--ease-out)',
      boxShadow: '0 1px 2px rgba(0,0,0,.25)'
    }
  })), label);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Breadcrumbs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Breadcrumbs({
  items = [],
  tone = 'light',
  style,
  ...rest
}) {
  const light = tone === 'light';
  return /*#__PURE__*/React.createElement("nav", _extends({
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-2)',
      font: 'var(--type-body)',
      fontSize: 'var(--fs-body-sm)',
      ...style
    }
  }, rest), items.map((it, i) => {
    const last = i === items.length - 1;
    const label = it.label ?? it;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: label
    }, i > 0 ? /*#__PURE__*/React.createElement("span", {
      "aria-hidden": true,
      style: {
        color: light ? 'var(--gray-300)' : 'var(--text-tertiary)'
      }
    }, "\u203A") : null, /*#__PURE__*/React.createElement("span", {
      style: {
        color: last ? light ? 'var(--gray-900)' : 'var(--kortx-white)' : light ? 'var(--gray-500)' : 'var(--text-tertiary)',
        fontWeight: last ? 'var(--fw-medium)' : 'var(--fw-regular)',
        cursor: last ? 'default' : 'pointer'
      }
    }, label));
  }));
}
Object.assign(__ds_scope, { Breadcrumbs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Breadcrumbs.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SidebarNav.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function SidebarNav({
  items = [],
  value,
  onChange,
  footer,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("nav", _extends({
    style: {
      width: 56,
      flex: '0 0 56px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 'var(--space-2)',
      padding: 'var(--space-4) 0',
      background: 'var(--navy-850)',
      color: 'var(--text-tertiary)',
      ...style
    }
  }, rest), items.map(it => /*#__PURE__*/React.createElement(NavRail, {
    key: it.value,
    item: it,
    active: it.value === value,
    onClick: () => onChange && onChange(it.value)
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), footer);
}
function NavRail({
  item,
  active,
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    "aria-label": item.label,
    title: item.label,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: 36,
      height: 36,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: 0,
      borderRadius: 'var(--radius-md)',
      cursor: 'pointer',
      background: active ? 'var(--blue-600)' : hover ? 'rgba(255,255,255,.08)' : 'transparent',
      color: active ? 'var(--kortx-white)' : 'rgba(255,255,255,.7)',
      transition: 'var(--transition-control)'
    }
  }, item.icon);
}
function NavItem({
  icon,
  label,
  badge,
  active = false,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", _extends({
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-3)',
      width: '100%',
      height: 36,
      padding: '0 var(--space-3)',
      border: 0,
      borderRadius: 'var(--radius-md)',
      cursor: 'pointer',
      textAlign: 'left',
      background: active ? 'var(--gray-100)' : hover ? 'var(--gray-50)' : 'transparent',
      font: 'var(--type-label)',
      fontSize: 'var(--fs-body-sm)',
      fontWeight: active ? 'var(--fw-semibold)' : 'var(--fw-medium)',
      color: active ? 'var(--gray-900)' : 'var(--gray-600)',
      transition: 'var(--transition-control)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      color: active ? 'var(--gray-800)' : 'var(--gray-400)'
    }
  }, icon), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, label), badge);
}
Object.assign(__ds_scope, { SidebarNav, NavItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SidebarNav.jsx", error: String((e && e.message) || e) }); }

// components/navigation/TopBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function TopBar({
  left,
  links = [],
  right,
  tone = 'dark',
  sticky = true,
  style,
  ...rest
}) {
  const dark = tone === 'dark';
  return /*#__PURE__*/React.createElement("header", _extends({
    style: {
      position: sticky ? 'sticky' : 'static',
      top: 0,
      zIndex: 20,
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-8)',
      height: 72,
      padding: '0 var(--space-8)',
      background: dark ? 'rgba(0,25,48,.72)' : 'rgba(255,255,255,.86)',
      backdropFilter: 'blur(14px)',
      borderBottom: '1px solid ' + (dark ? 'var(--border-subtle)' : 'var(--gray-200)'),
      ...style
    }
  }, rest), left, /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-6)',
      marginLeft: 'var(--space-4)'
    }
  }, links.map(l => /*#__PURE__*/React.createElement(TopLink, _extends({
    key: l.label
  }, l, {
    dark: dark
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), right);
}
function TopLink({
  label,
  href = '#',
  dark
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("a", {
    href: href,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      font: 'var(--type-label)',
      fontSize: 'var(--fs-body-sm)',
      textDecoration: 'none',
      color: hover ? dark ? 'var(--blue-300)' : 'var(--blue-500)' : dark ? 'var(--text-secondary)' : 'var(--gray-600)',
      transition: 'var(--transition-control)'
    }
  }, label);
}
Object.assign(__ds_scope, { TopBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/TopBar.jsx", error: String((e && e.message) || e) }); }

// components/patterns/AccentBullet.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function AccentBullet({
  title,
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      gap: 'var(--space-3)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 'var(--border-width-accent)',
      flex: '0 0 var(--border-width-accent)',
      borderRadius: 1,
      background: 'var(--accent-rule)'
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-label)',
      color: 'var(--text-primary)',
      marginBottom: 'var(--space-1)'
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-body)',
      fontSize: 'var(--fs-body-sm)',
      color: 'var(--text-secondary)'
    }
  }, children)));
}
Object.assign(__ds_scope, { AccentBullet });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/patterns/AccentBullet.jsx", error: String((e && e.message) || e) }); }

// components/patterns/FeaturePill.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function FeaturePill({
  icon,
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-4)',
      padding: 'var(--space-4) var(--space-5)',
      borderRadius: 'var(--radius-lg)',
      background: 'var(--ink-black)',
      border: '1px solid var(--border-subtle)',
      boxShadow: 'var(--shadow-card-dark)',
      ...style
    }
  }, rest), icon ? /*#__PURE__*/React.createElement("span", {
    style: {
      width: 28,
      height: 28,
      flex: '0 0 28px',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 'var(--radius-pill)',
      background: 'rgba(0,204,255,.12)',
      color: 'var(--blue-400)'
    }
  }, icon) : null, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-body)',
      fontSize: 'var(--fs-body-md)',
      color: 'var(--text-primary)'
    }
  }, children));
}
Object.assign(__ds_scope, { FeaturePill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/patterns/FeaturePill.jsx", error: String((e && e.message) || e) }); }

// components/patterns/IconTile.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function IconTile({
  icon,
  label,
  active = false,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'var(--space-3)',
      padding: 'var(--space-6)',
      background: 'var(--ink-black)',
      border: '1px solid ' + (active || hover ? 'rgba(0,204,255,.35)' : 'var(--border-subtle)'),
      borderRadius: 'var(--radius-lg)',
      transition: 'var(--transition-control)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 40,
      height: 40,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 'var(--radius-pill)',
      background: 'rgba(0,204,255,.10)',
      color: 'var(--blue-400)'
    }
  }, icon), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-body)',
      fontSize: 'var(--fs-body-md)',
      color: 'var(--text-primary)'
    }
  }, label));
}
Object.assign(__ds_scope, { IconTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/patterns/IconTile.jsx", error: String((e && e.message) || e) }); }

// components/patterns/NumberedCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function NumberedCard({
  index,
  title,
  media,
  children,
  glow = false,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 'var(--radius-xl)',
      overflow: 'hidden',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      boxShadow: (glow ? 'var(--glow-accent-soft),' : '') + 'var(--shadow-panel-dark)',
      transform: hover ? 'translateY(-3px)' : 'none',
      transition: 'transform var(--dur-base) var(--ease-out)',
      ...style
    }
  }, rest), media ? /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: '16/11',
      overflow: 'hidden',
      background: 'var(--navy-950)'
    }
  }, media) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 26,
      height: 26,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 'var(--radius-pill)',
      border: '1px solid var(--border-default)',
      font: 'var(--type-eyebrow)',
      fontSize: 'var(--fs-micro)',
      color: 'var(--text-tertiary)',
      marginBottom: 'var(--space-4)'
    }
  }, index), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-label)',
      fontSize: 'var(--fs-body-lg)',
      color: 'var(--blue-400)',
      marginBottom: 'var(--space-2)'
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-body)',
      fontSize: 'var(--fs-body-sm)',
      color: 'var(--text-secondary)'
    }
  }, children)));
}
Object.assign(__ds_scope, { NumberedCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/patterns/NumberedCard.jsx", error: String((e && e.message) || e) }); }

// components/patterns/StatCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function StatCard({
  value,
  label,
  media,
  tone = 'dark',
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const dark = tone === 'dark';
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: 'relative',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      minHeight: 220,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      background: dark ? 'var(--navy-950)' : 'var(--gray-0)',
      border: '1px solid ' + (dark ? 'var(--border-subtle)' : 'var(--gray-200)'),
      transition: 'transform var(--dur-base) var(--ease-out)',
      transform: hover ? 'translateY(-3px)' : 'none',
      ...style
    }
  }, rest), media ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      overflow: 'hidden'
    }
  }, media) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      padding: 'var(--space-6)',
      background: dark ? 'linear-gradient(to top,rgba(0,10,22,.92) 0%,rgba(0,10,22,.55) 60%,rgba(0,10,22,0) 100%)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-page-title)',
      fontSize: 'var(--fs-title-lg)',
      letterSpacing: 'var(--ls-title)',
      color: dark ? 'var(--kortx-white)' : 'var(--gray-900)'
    }
  }, value), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-body)',
      fontSize: 'var(--fs-body-sm)',
      marginTop: 'var(--space-2)',
      color: dark ? 'var(--text-secondary)' : 'var(--gray-600)'
    }
  }, label)));
}
Object.assign(__ds_scope, { StatCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/patterns/StatCard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/kampus/KampusShell.jsx
try { (() => {
const {
  SidebarNav,
  NavItem,
  Badge,
  IconButton,
  Logo
} = window.KORTXDesignSystem_a22685;
const I = (n, s = 17) => React.createElement('i', {
  'data-lucide': n,
  style: {
    width: s,
    height: s
  }
});
function KampusShell({
  module,
  onModule,
  children
}) {
  React.useEffect(() => {
    window.lucide && window.lucide.createIcons();
  });
  const rail = [{
    value: 'home',
    label: 'Home',
    icon: I('house')
  }, {
    value: 'library',
    label: 'Library',
    icon: I('book-open')
  }, {
    value: 'files',
    label: 'Files',
    icon: I('folder')
  }, {
    value: 'activation',
    label: 'Activation',
    icon: I('radio')
  }, {
    value: 'audiences',
    label: 'Audiences',
    icon: I('users')
  }, {
    value: 'reporting',
    label: 'Reporting',
    icon: I('chart-pie')
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      height: '100vh',
      minWidth: 1280,
      background: 'var(--gray-50)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(SidebarNav, {
    items: rail,
    value: "reporting",
    onChange: () => {},
    footer: /*#__PURE__*/React.createElement(IconButton, {
      label: "Alerts",
      style: {
        color: 'rgba(255,255,255,.7)'
      }
    }, I('bell')),
    style: {
      justifyContent: 'flex-start'
    }
  }), /*#__PURE__*/React.createElement("aside", {
    style: {
      flex: '0 0 232px',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-1)',
      padding: 'var(--space-5) var(--space-3)',
      background: 'var(--gray-50)',
      borderRight: '1px solid var(--gray-200)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 var(--space-2)',
      marginBottom: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-section-title)',
      fontSize: 'var(--fs-title-sm)',
      color: 'var(--gray-900)'
    }
  }, "Reporting Suite"), /*#__PURE__*/React.createElement(IconButton, {
    label: "Collapse",
    variant: "solid",
    size: "sm",
    style: {
      background: 'var(--gray-0)',
      borderColor: 'var(--gray-200)',
      color: 'var(--gray-500)'
    }
  }, I('chevron-left', 14))), /*#__PURE__*/React.createElement("button", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-3)',
      height: 40,
      padding: '0 var(--space-3)',
      marginBottom: 'var(--space-5)',
      borderRadius: 'var(--radius-md)',
      background: 'var(--gray-0)',
      border: '1px solid var(--gray-300)',
      boxShadow: 'var(--shadow-card-light)',
      cursor: 'pointer',
      textAlign: 'left'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 20,
      borderRadius: '999px',
      background: 'var(--gray-800)',
      flex: '0 0 20px'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      font: 'var(--type-label)',
      fontSize: 'var(--fs-body-sm)',
      color: 'var(--gray-900)'
    }
  }, window.KampusData.advertiser), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true,
    style: {
      color: 'var(--gray-400)',
      fontSize: 10,
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", null, "\u25B2"), /*#__PURE__*/React.createElement("span", null, "\u25BC"))), /*#__PURE__*/React.createElement(NavItem, {
    icon: I('layout-dashboard', 16),
    label: "Dashboards",
    active: module === 'dashboards',
    onClick: () => onModule('dashboards')
  }), /*#__PURE__*/React.createElement(NavItem, {
    icon: I('radio', 16),
    label: "Campaign Reporting",
    active: module === 'reporting',
    onClick: () => onModule('reporting')
  }), /*#__PURE__*/React.createElement(NavItem, {
    icon: I('clipboard-list', 16),
    label: "Scorecards",
    active: module === 'scorecards',
    onClick: () => onModule('scorecards'),
    badge: /*#__PURE__*/React.createElement(Badge, {
      tone: "neutral",
      style: {
        background: 'var(--gray-100)',
        color: 'var(--gray-600)',
        borderColor: 'var(--gray-200)'
      }
    }, "20+")
  }), /*#__PURE__*/React.createElement(NavItem, {
    icon: I('bell-ring', 16),
    label: "Alert Manager",
    active: module === 'alerts',
    onClick: () => onModule('alerts')
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-eyebrow)',
      letterSpacing: 'var(--ls-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--gray-400)',
      padding: '0 var(--space-2) var(--space-2)'
    }
  }, "Settings"), /*#__PURE__*/React.createElement(NavItem, {
    icon: /*#__PURE__*/React.createElement("span", {
      style: {
        font: 'var(--type-eyebrow)',
        fontSize: 9,
        color: 'var(--gray-500)'
      }
    }, "DC"),
    label: "Data Connections"
  })), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1,
      minWidth: 0,
      overflow: 'auto',
      background: 'var(--gray-0)'
    },
    "data-theme": "light"
  }, children));
}
Object.assign(window, {
  KampusShell,
  KampusIcon: I
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/kampus/KampusShell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/kampus/PerformanceDetail.jsx
try { (() => {
const {
  Card,
  SegmentedControl,
  Eyebrow,
  Divider
} = window.KORTXDesignSystem_a22685;
function PerformanceDetail() {
  const d = window.KampusData;
  const [tab, setTab] = React.useState('Line Item');
  const [open, setOpen] = React.useState({
    'Connected TV': true,
    'Display Blended': false,
    'Display Retargeting': false
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-6) var(--space-8) var(--space-12)',
      display: 'grid',
      gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)',
      gap: 'var(--space-6)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    tone: "light",
    padding: "0",
    style: {
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-4) var(--space-5)',
      display: 'flex',
      alignItems: 'flex-start',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "muted"
  }, "Performance"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-body)',
      fontSize: 'var(--fs-caption)',
      color: 'var(--gray-500)',
      marginTop: 4
    }
  }, "Select performance detail breakdown.")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(SegmentedControl, {
    size: "sm",
    options: ['Publisher', 'Line Item'],
    value: tab,
    onChange: setTab
  })), /*#__PURE__*/React.createElement(Divider, {
    style: {
      background: 'var(--gray-200)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-2) 0'
    }
  }, ['Connected TV', 'Display Blended', 'Display Retargeting'].map(group => /*#__PURE__*/React.createElement("div", {
    key: group
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen({
      ...open,
      [group]: !open[group]
    }),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-2)',
      width: '100%',
      padding: 'var(--space-3) var(--space-5)',
      border: 0,
      background: 'transparent',
      cursor: 'pointer',
      textAlign: 'left',
      font: 'var(--type-label)',
      fontSize: 'var(--fs-body-sm)',
      color: 'var(--gray-900)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true,
    style: {
      color: 'var(--gray-400)',
      width: 10
    }
  }, open[group] ? '\u2014' : '+'), group), open[group] ? d.lineItems.slice(0, 2).map(li => /*#__PURE__*/React.createElement("div", {
    key: li,
    style: {
      padding: 'var(--space-2) var(--space-5) var(--space-2) 42px',
      font: 'var(--type-body)',
      fontSize: 'var(--fs-caption)',
      color: 'var(--gray-600)'
    }
  }, li)) : null)))), /*#__PURE__*/React.createElement(Card, {
    tone: "light",
    padding: "0",
    style: {
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-4) var(--space-5)',
      display: 'flex',
      alignItems: 'flex-start',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "muted"
  }, "Performance"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(SegmentedControl, {
    size: "sm",
    options: ['Publisher', 'Line Item'],
    value: "Publisher",
    onChange: () => {}
  })), /*#__PURE__*/React.createElement(Divider, {
    style: {
      background: 'var(--gray-200)'
    }
  }), d.publishers.slice(0, 4).map(p => /*#__PURE__*/React.createElement("div", {
    key: p.name,
    style: {
      display: 'flex',
      gap: 'var(--space-4)',
      alignItems: 'center',
      padding: 'var(--space-4) var(--space-5)',
      borderBottom: '1px solid var(--gray-200)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 52,
      height: 34,
      flex: '0 0 52px',
      borderRadius: 'var(--radius-sm)',
      background: 'var(--gray-100)',
      border: '1px solid var(--gray-200)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      font: 'var(--type-eyebrow)',
      fontSize: 9,
      color: 'var(--gray-500)'
    }
  }, p.name.slice(0, 4).toUpperCase()), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-body)',
      fontSize: 'var(--fs-caption)',
      color: 'var(--gray-600)'
    }
  }, p.desc)))), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '1 / -1'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    tone: "light",
    padding: "var(--space-5)"
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "muted"
  }, "Performance reporting modules"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 'var(--space-2)',
      marginTop: 'var(--space-4)'
    }
  }, d.modules.map(m => /*#__PURE__*/React.createElement("span", {
    key: m,
    style: {
      padding: '6px var(--space-3)',
      borderRadius: 'var(--radius-pill)',
      background: 'var(--gray-50)',
      border: '1px solid var(--gray-200)',
      font: 'var(--type-body)',
      fontSize: 'var(--fs-caption)',
      color: 'var(--gray-700)'
    }
  }, m))))));
}
Object.assign(window, {
  PerformanceDetail
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/kampus/PerformanceDetail.jsx", error: String((e && e.message) || e) }); }

// ui_kits/kampus/ReportingScreen.jsx
try { (() => {
const {
  Breadcrumbs,
  Select,
  IconButton,
  MetricTile,
  DeltaBadge,
  Card,
  Tabs,
  LineChart,
  SegmentedControl,
  DataTable
} = window.KORTXDesignSystem_a22685;
function ReportingScreen() {
  const d = window.KampusData;
  const I = window.KampusIcon;
  const [granularity, setGranularity] = React.useState('Day');
  const [breakdown, setBreakdown] = React.useState('Publisher');
  const [metricA, setMetricA] = React.useState('Impressions');
  React.useEffect(() => {
    window.lucide && window.lucide.createIcons();
  });
  const step = granularity === 'Day' ? 1 : granularity === 'Week' ? 3 : 5;
  const pick = a => a.filter((_, i) => i % step === 0);
  const labels = pick(d.days);
  const rows = d.publishers.map((p, i) => ({
    name: /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-3)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 44,
        height: 30,
        flex: '0 0 44px',
        borderRadius: 'var(--radius-sm)',
        background: 'var(--gray-100)',
        border: '1px solid var(--gray-200)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        font: 'var(--type-eyebrow)',
        fontSize: 9,
        color: 'var(--gray-500)'
      }
    }, p.name.slice(0, 4).toUpperCase()), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        font: 'var(--type-label)',
        fontSize: 'var(--fs-body-sm)',
        color: 'var(--gray-900)'
      }
    }, p.name), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        font: 'var(--type-body)',
        fontSize: 'var(--fs-caption)',
        color: 'var(--gray-500)'
      }
    }, "Description"))),
    imps: (184204 - i * 21500).toLocaleString(),
    conv: (2410 - i * 260).toLocaleString(),
    cpa: '$ ' + (5.10 + i * 0.32).toFixed(2),
    amount: '$ ' + (41200 - i * 4300).toLocaleString(),
    roas: (4.2 - i * 0.24).toFixed(1),
    spend: '$ ' + (9800 - i * 980).toLocaleString()
  }));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-6) var(--space-8) var(--space-12)'
    }
  }, /*#__PURE__*/React.createElement(Breadcrumbs, {
    items: ['Campaign Reporting', d.advertiser]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-4)',
      margin: 'var(--space-3) 0 var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: 'var(--type-page-title)',
      fontSize: 'var(--fs-title-lg)',
      letterSpacing: 'var(--ls-title)',
      color: 'var(--gray-900)',
      whiteSpace: 'nowrap'
    }
  }, d.campaign), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(Select, {
    options: ['Conversions', 'Impressions', 'Spend', 'CPA'],
    style: {
      minWidth: 170
    }
  }), /*#__PURE__*/React.createElement(Select, {
    options: ['Last 30 days', 'Last 7 days', 'Quarter to date'],
    style: {
      minWidth: 160
    }
  }), /*#__PURE__*/React.createElement(IconButton, {
    label: "Settings",
    variant: "solid",
    style: {
      height: 38,
      width: 38,
      background: 'var(--gray-0)',
      borderColor: 'var(--gray-300)',
      boxShadow: 'var(--shadow-card-light)'
    }
  }, I('settings', 16)), /*#__PURE__*/React.createElement(IconButton, {
    label: "Download",
    variant: "solid",
    style: {
      height: 38,
      width: 38,
      background: 'var(--gray-0)',
      borderColor: 'var(--gray-900)',
      boxShadow: 'var(--shadow-card-light)',
      color: 'var(--gray-900)'
    }
  }, I('download', 16))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-4)',
      marginBottom: 'var(--space-6)'
    }
  }, d.kpis.map(k => /*#__PURE__*/React.createElement(MetricTile, {
    key: k.label,
    label: k.label,
    value: k.value,
    delta: /*#__PURE__*/React.createElement(DeltaBadge, {
      value: k.delta,
      direction: k.dir
    })
  }))), /*#__PURE__*/React.createElement(Card, {
    tone: "light",
    padding: "var(--space-5)",
    style: {
      marginBottom: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-section-title)',
      fontSize: 'var(--fs-title-sm)',
      color: 'var(--gray-900)'
    }
  }, "Metrics"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-body)',
      fontSize: 'var(--fs-caption)',
      color: 'var(--gray-500)',
      marginTop: 2
    }
  }, "Compare two metrics over time.")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-3)'
    }
  }, /*#__PURE__*/React.createElement(Legend, {
    color: "var(--blue-400)"
  }, /*#__PURE__*/React.createElement(Select, {
    value: metricA,
    onChange: e => setMetricA(e.target.value),
    options: ['Impressions', 'Conversions', 'Clicks']
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-body)',
      fontSize: 'var(--fs-caption)',
      color: 'var(--gray-500)'
    }
  }, "vs"), /*#__PURE__*/React.createElement(Legend, {
    color: "var(--violet-500)"
  }, /*#__PURE__*/React.createElement(Select, {
    options: ['Cost', 'CPA', 'ROAS']
  })), /*#__PURE__*/React.createElement(IconButton, {
    label: "Card menu"
  }, I('ellipsis-vertical', 16)))), /*#__PURE__*/React.createElement(Tabs, {
    items: ['Day', 'Week', 'Month'],
    value: granularity,
    onChange: setGranularity,
    style: {
      margin: 'var(--space-5) 0 var(--space-5)'
    }
  }), /*#__PURE__*/React.createElement(LineChart, {
    height: 230,
    labels: labels,
    series: [{
      name: metricA,
      data: pick(d.impressions)
    }, {
      name: 'Cost',
      data: pick(d.cost)
    }]
  })), /*#__PURE__*/React.createElement(Card, {
    tone: "light",
    padding: "0",
    style: {
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 'var(--space-4)',
      padding: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-section-title)',
      fontSize: 'var(--fs-title-sm)',
      color: 'var(--gray-900)'
    }
  }, "Performance"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-body)',
      fontSize: 'var(--fs-caption)',
      color: 'var(--gray-500)',
      marginTop: 2
    }
  }, "Select performance detail breakdown.")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(SegmentedControl, {
    options: ['Publisher', 'Line Item', 'Creative', 'Device', 'Geography'],
    value: breakdown,
    onChange: setBreakdown
  }), /*#__PURE__*/React.createElement(IconButton, {
    label: "Card menu"
  }, I('ellipsis-vertical', 16))), breakdown === 'Publisher' ? /*#__PURE__*/React.createElement(DataTable, {
    style: {
      marginTop: 0
    },
    columns: [{
      key: 'name',
      label: 'Name'
    }, {
      key: 'imps',
      label: 'Impressions'
    }, {
      key: 'conv',
      label: 'Conversions'
    }, {
      key: 'cpa',
      label: 'CPA'
    }, {
      key: 'amount',
      label: 'Conversion Amount'
    }, {
      key: 'roas',
      label: 'ROAS'
    }, {
      key: 'spend',
      label: 'Spend'
    }],
    rows: rows
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-16) var(--space-5)',
      textAlign: 'center',
      font: 'var(--type-body)',
      fontSize: 'var(--fs-body-sm)',
      color: 'var(--gray-500)',
      borderTop: '1px solid var(--gray-200)'
    }
  }, "The ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--gray-700)'
    }
  }, breakdown), " breakdown was not visible in the supplied source.", /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-caption)',
      marginTop: 6
    }
  }, "Left intentionally blank rather than invented \u2014 see readme.md."))));
}
function Legend({
  color,
  children
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--space-2)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: 999,
      background: color
    }
  }), children);
}
Object.assign(window, {
  ReportingScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/kampus/ReportingScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/kampus/data.js
try { (() => {
window.KampusData = {
  advertiser: 'Shinola',
  campaign: 'Store Wide Sale Q4 (CTV)',
  kpis: [{
    label: 'Impressions',
    value: '1.2 M',
    delta: '1.5%',
    dir: 'up'
  }, {
    label: 'Spend',
    value: '$ 32,000',
    delta: '-',
    dir: 'flat'
  }, {
    label: 'CPA',
    value: '$ 5.60',
    delta: '29.2%',
    dir: 'up'
  }, {
    label: 'Conversions',
    value: '12,462',
    delta: '13.8%',
    dir: 'up'
  }],
  days: ['04/25', '04/26', '04/27', '04/28', '04/29', '04/30', '05/01', '05/02', '05/03', '05/04', '05/05', '05/06', '05/07', '05/08', '05/09', '05/10', '05/11', '05/12', '05/13', '05/14'],
  impressions: [10, 25, 15, 22, 32, 15, 10, 24, 20, 28, 15, 25, 10, 25, 20, 28, 15, 26, 32, 28],
  cost: [10, 8, 15, 22, 32, 25, 10, 24, 45, 32, 54, 46, 64, 45, 75, 54, 46, 64, 45, 75],
  publishers: [{
    name: 'Bloomberg',
    desc: 'Business and market news across streaming and connected devices.'
  }, {
    name: 'Roku',
    desc: 'Digital media player brand offering streaming content via devices and TVs.'
  }, {
    name: 'Hulu',
    desc: 'Premium streaming service offering live and on-demand TV and movies.'
  }, {
    name: 'Sling',
    desc: 'Top live TV streaming service, offering a selection of major cable channels.'
  }, {
    name: 'Xumo',
    desc: 'Free ad-supported streaming television service.'
  }, {
    name: 'Plex',
    desc: 'Free streaming with a large FAST channel line-up.'
  }],
  lineItems: ['Axon - Watch Intenders', 'Axon - Household Reach', 'Display Blended', 'Display Retargeting'],
  modules: ['Audience Insights', 'Audience Persona', 'Creative Performance', 'Site Activity & Conversions', 'Domain/App/Publisher Delivery', 'Geography', 'Rich Media Engagement']
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/kampus/data.js", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Divider = __ds_scope.Divider;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.LogoLockup = __ds_scope.LogoLockup;

__ds_ns.DataTable = __ds_scope.DataTable;

__ds_ns.DeltaBadge = __ds_scope.DeltaBadge;

__ds_ns.LineChart = __ds_scope.LineChart;

__ds_ns.MetricTile = __ds_scope.MetricTile;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.SegmentedControl = __ds_scope.SegmentedControl;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Breadcrumbs = __ds_scope.Breadcrumbs;

__ds_ns.SidebarNav = __ds_scope.SidebarNav;

__ds_ns.NavItem = __ds_scope.NavItem;

__ds_ns.TopBar = __ds_scope.TopBar;

__ds_ns.AccentBullet = __ds_scope.AccentBullet;

__ds_ns.FeaturePill = __ds_scope.FeaturePill;

__ds_ns.IconTile = __ds_scope.IconTile;

__ds_ns.NumberedCard = __ds_scope.NumberedCard;

__ds_ns.StatCard = __ds_scope.StatCard;

})();
