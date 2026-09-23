import { useEffect, useState, type FormEvent } from "react";
import { Edit2, Loader2, Plus, Save, Trash2, X } from "lucide-react";
import useAPI from "../../../hook/useAPI";
import apiConfig from "../../../config/global.json";

function getAuthHeader() {
  const token = sessionStorage.getItem("admin_access_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

interface SiteSetting {
  id: number;
  company_name: string;
  tagline: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  copyright_text: string;
  updated_at: string;
}

interface SocialLink {
  id: number;
  platform: string;
  url: string;
  is_active: boolean;
  sort_order: number;
}

interface FooterMenu {
  id: number;
  title: string;
  label: string;
  url: string;
  is_active: boolean;
  sort_order: number;
}

const inputCls =
  "w-full rounded-xl border border-black/[0.10] bg-black/[0.02] px-4 py-2.5 text-sm outline-none transition placeholder:text-black/30 focus:border-[#2f8fe6]/50 focus:ring-2 focus:ring-[#2f8fe6]/10 dark:border-white/[0.10] dark:bg-white/[0.03] dark:placeholder:text-white/25 dark:focus:border-[#58adff]/50";

const TABS = ["Site Settings", "Social Links", "Footer Menus"] as const;
type Tab = (typeof TABS)[number];

const PLATFORMS = ["instagram", "facebook", "linkedin", "youtube", "twitter", "github"];

export default function AdminFooterPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Site Settings");
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ── Site Settings ──────────────────────────────────────────
  const { data: siteData, loading: siteLoading, request: siteRequest } = useAPI<SiteSetting[]>();
  const { loading: siteSaving, request: siteMutate } = useAPI<SiteSetting>();
  const [siteForm, setSiteForm] = useState({
    company_name: "", tagline: "", description: "",
    phone: "", email: "", address: "", copyright_text: "",
  });
  const [siteId, setSiteId] = useState<number | null>(null);

  const loadSite = () => siteRequest(apiConfig.api.endpoints.siteSettings, "GET", undefined, { headers: getAuthHeader() });

  useEffect(() => { loadSite(); }, []);

  useEffect(() => {
    const s = siteData?.[0];
    if (s) {
      setSiteId(s.id);
      setSiteForm({
        company_name: s.company_name,
        tagline: s.tagline,
        description: s.description,
        phone: s.phone,
        email: s.email,
        address: s.address,
        copyright_text: s.copyright_text,
      });
    }
  }, [siteData]);

  const handleSiteSave = async (e: FormEvent) => {
    e.preventDefault();
    const endpoint = siteId
      ? `${apiConfig.api.endpoints.siteSettings}${siteId}/`
      : apiConfig.api.endpoints.siteSettings;
    const res = await siteMutate(endpoint, siteId ? "PATCH" : "POST", siteForm, { headers: getAuthHeader() });
    if (res) { showToast("Site settings saved."); loadSite(); }
    else showToast("Failed to save.", "error");
  };

  // ── Social Links ───────────────────────────────────────────
  const { data: socialData, loading: socialLoading, request: socialRequest } = useAPI<SocialLink[]>();
  const { loading: socialSaving, request: socialMutate } = useAPI<SocialLink>();
  const [socialForm, setSocialForm] = useState({ platform: "instagram", url: "", is_active: true, sort_order: 0 });
  const [editingSocial, setEditingSocial] = useState<SocialLink | null>(null);
  const [socialFormOpen, setSocialFormOpen] = useState(false);
  const [deletingSocialId, setDeletingSocialId] = useState<number | null>(null);

  const loadSocial = () => socialRequest(apiConfig.api.endpoints.socialLinks, "GET", undefined, { headers: getAuthHeader() });

  useEffect(() => { loadSocial(); }, []);

  const handleSocialSave = async (e: FormEvent) => {
    e.preventDefault();
    const endpoint = editingSocial
      ? `${apiConfig.api.endpoints.socialLinks}${editingSocial.id}/`
      : apiConfig.api.endpoints.socialLinks;
    const res = await socialMutate(endpoint, editingSocial ? "PATCH" : "POST", socialForm, { headers: getAuthHeader() });
    if (res) {
      showToast(editingSocial ? "Social link updated." : "Social link added.");
      setSocialFormOpen(false);
      setEditingSocial(null);
      setSocialForm({ platform: "instagram", url: "", is_active: true, sort_order: 0 });
      loadSocial();
    } else showToast("Failed to save.", "error");
  };

  const handleDeleteSocial = async (id: number) => {
    await socialMutate(`${apiConfig.api.endpoints.socialLinks}${id}/`, "DELETE", undefined, { headers: getAuthHeader() });
    setDeletingSocialId(null);
    showToast("Social link deleted.");
    loadSocial();
  };

  const handleToggleSocial = async (link: SocialLink) => {
    await socialMutate(`${apiConfig.api.endpoints.socialLinks}${link.id}/`, "PATCH", { is_active: !link.is_active }, { headers: getAuthHeader() });
    loadSocial();
  };

  // ── Footer Menus ───────────────────────────────────────────
  const { data: menuData, loading: menuLoading, request: menuRequest } = useAPI<FooterMenu[]>();
  const { loading: menuSaving, request: menuMutate } = useAPI<FooterMenu>();
  const [menuForm, setMenuForm] = useState({ title: "", label: "", url: "", is_active: true, sort_order: 0 });
  const [editingMenu, setEditingMenu] = useState<FooterMenu | null>(null);
  const [menuFormOpen, setMenuFormOpen] = useState(false);
  const [deletingMenuId, setDeletingMenuId] = useState<number | null>(null);

  const loadMenus = () => menuRequest(apiConfig.api.endpoints.footerMenus, "GET", undefined, { headers: getAuthHeader() });

  useEffect(() => { loadMenus(); }, []);

  const handleMenuSave = async (e: FormEvent) => {
    e.preventDefault();
    const endpoint = editingMenu
      ? `${apiConfig.api.endpoints.footerMenus}${editingMenu.id}/`
      : apiConfig.api.endpoints.footerMenus;
    const res = await menuMutate(endpoint, editingMenu ? "PATCH" : "POST", menuForm, { headers: getAuthHeader() });
    if (res) {
      showToast(editingMenu ? "Menu item updated." : "Menu item added.");
      setMenuFormOpen(false);
      setEditingMenu(null);
      setMenuForm({ title: "", label: "", url: "", is_active: true, sort_order: 0 });
      loadMenus();
    } else showToast("Failed to save.", "error");
  };

  const handleDeleteMenu = async (id: number) => {
    await menuMutate(`${apiConfig.api.endpoints.footerMenus}${id}/`, "DELETE", undefined, { headers: getAuthHeader() });
    setDeletingMenuId(null);
    showToast("Menu item deleted.");
    loadMenus();
  };

  const handleToggleMenu = async (menu: FooterMenu) => {
    await menuMutate(`${apiConfig.api.endpoints.footerMenus}${menu.id}/`, "PATCH", { is_active: !menu.is_active }, { headers: getAuthHeader() });
    loadMenus();
  };

  // group menus by title
  const groupedMenus = (menuData ?? []).reduce<Record<string, FooterMenu[]>>((acc, m) => {
    if (!acc[m.title]) acc[m.title] = [];
    acc[m.title].push(m);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {toast && (
        <div className={`fixed bottom-6 right-6 z-[60] rounded-xl border px-5 py-3 text-sm font-medium shadow-lg ${
          toast.type === "success"
            ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
            : "border-red-400/20 bg-red-400/10 text-red-500 dark:text-red-400"
        }`}>{toast.msg}</div>
      )}

      {/* Header */}
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2f8fe6]">Content</p>
        <h2 className="mt-1 text-2xl font-bold tracking-[-0.04em] sm:text-3xl">Footer</h2>
        <p className="mt-1 text-sm text-black/45 dark:text-white/40">Manage site settings, social links and footer menus</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-xl border border-black/[0.07] bg-black/[0.02] p-1 dark:border-white/[0.08] dark:bg-white/[0.03]">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition ${
              activeTab === tab
                ? "bg-white text-[#05070b] shadow-sm dark:bg-white/[0.08] dark:text-white"
                : "text-black/45 hover:text-black/70 dark:text-white/40 dark:hover:text-white/60"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── TAB: Site Settings ── */}
      {activeTab === "Site Settings" && (
        <div className="rounded-2xl border border-black/[0.07] bg-white p-6 dark:border-white/[0.08] dark:bg-white/[0.04]">
          {siteLoading ? (
            <div className="flex items-center justify-center gap-2 py-12 text-sm text-black/40 dark:text-white/35">
              <Loader2 size={18} className="animate-spin" /> Loading...
            </div>
          ) : (
            <form onSubmit={handleSiteSave} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-black/60 dark:text-white/55">Company Name</label>
                  <input value={siteForm.company_name} onChange={(e) => setSiteForm((p) => ({ ...p, company_name: e.target.value }))} placeholder="Comrade Coders" className={inputCls} />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-black/60 dark:text-white/55">Tagline</label>
                  <input value={siteForm.tagline} onChange={(e) => setSiteForm((p) => ({ ...p, tagline: e.target.value }))} placeholder="Short tagline" className={inputCls} />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-black/60 dark:text-white/55">Email</label>
                  <input type="email" value={siteForm.email} onChange={(e) => setSiteForm((p) => ({ ...p, email: e.target.value }))} placeholder="info@comradecoders.com" className={inputCls} />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-black/60 dark:text-white/55">Phone</label>
                  <input value={siteForm.phone} onChange={(e) => setSiteForm((p) => ({ ...p, phone: e.target.value }))} placeholder="+91 98xxx xxxxx" className={inputCls} />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-black/60 dark:text-white/55">Address</label>
                <input value={siteForm.address} onChange={(e) => setSiteForm((p) => ({ ...p, address: e.target.value }))} placeholder="City, State, Country" className={inputCls} />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-black/60 dark:text-white/55">Description (shown in footer)</label>
                <textarea rows={3} value={siteForm.description} onChange={(e) => setSiteForm((p) => ({ ...p, description: e.target.value }))} placeholder="Brief company description..." className={`${inputCls} resize-none`} />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-black/60 dark:text-white/55">Copyright Text</label>
                <input value={siteForm.copyright_text} onChange={(e) => setSiteForm((p) => ({ ...p, copyright_text: e.target.value }))} placeholder="© 2025 Comrade Coders. All rights reserved." className={inputCls} />
              </div>
              <div className="flex justify-end">
                <button type="submit" disabled={siteSaving} className="flex items-center gap-2 rounded-xl bg-[#2f8fe6] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(47,143,230,0.22)] transition hover:bg-[#3d9bf0] disabled:opacity-60">
                  {siteSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                  {siteSaving ? "Saving..." : "Save changes"}
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* ── TAB: Social Links ── */}
      {activeTab === "Social Links" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-black/45 dark:text-white/40">{socialData?.length ?? 0} social links</p>
            <button
              type="button"
              onClick={() => { setEditingSocial(null); setSocialForm({ platform: "instagram", url: "", is_active: true, sort_order: (socialData?.length ?? 0) + 1 }); setSocialFormOpen(true); }}
              className="flex items-center gap-2 rounded-xl bg-[#2f8fe6] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#3d9bf0]"
            >
              <Plus size={15} /> Add Link
            </button>
          </div>

          <div className="rounded-2xl border border-black/[0.07] bg-white dark:border-white/[0.08] dark:bg-white/[0.04]">
            {socialLoading && (
              <div className="flex items-center justify-center gap-2 py-12 text-sm text-black/40 dark:text-white/35">
                <Loader2 size={18} className="animate-spin" /> Loading...
              </div>
            )}
            {!socialLoading && (socialData ?? []).length === 0 && (
              <div className="py-12 text-center text-sm text-black/40 dark:text-white/35">No social links yet.</div>
            )}
            {!socialLoading && (socialData ?? []).length > 0 && (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-black/[0.06] dark:border-white/[0.07]">
                    {["Platform", "URL", "Order", "Status", "Actions"].map((h) => (
                      <th key={h} className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-[0.14em] text-black/35 dark:text-white/30">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(socialData ?? []).sort((a, b) => a.sort_order - b.sort_order).map((link, i) => (
                    <tr key={link.id} className={`transition hover:bg-black/[0.015] dark:hover:bg-white/[0.025] ${i !== (socialData ?? []).length - 1 ? "border-b border-black/[0.05] dark:border-white/[0.06]" : ""}`}>
                      <td className="px-5 py-3.5 font-semibold capitalize">{link.platform}</td>
                      <td className="max-w-[200px] px-5 py-3.5">
                        <a href={link.url} target="_blank" rel="noreferrer" className="truncate block text-xs text-[#2f8fe6] hover:underline dark:text-[#58adff]">{link.url}</a>
                      </td>
                      <td className="px-5 py-3.5 text-xs text-black/45 dark:text-white/40">{link.sort_order}</td>
                      <td className="px-5 py-3.5">
                        <button type="button" onClick={() => handleToggleSocial(link)} className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold transition ${link.is_active ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-black/[0.05] text-black/40 dark:bg-white/[0.06] dark:text-white/35"}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${link.is_active ? "bg-emerald-500" : "bg-black/25 dark:bg-white/25"}`} />
                          {link.is_active ? "Active" : "Inactive"}
                        </button>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-1">
                          <button type="button" onClick={() => { setEditingSocial(link); setSocialForm({ platform: link.platform, url: link.url, is_active: link.is_active, sort_order: link.sort_order }); setSocialFormOpen(true); }} className="rounded-lg p-2 text-black/35 transition hover:bg-[#2f8fe6]/10 hover:text-[#2f8fe6] dark:text-white/30 dark:hover:text-[#58adff]"><Edit2 size={14} /></button>
                          <button type="button" onClick={() => setDeletingSocialId(link.id)} className="rounded-lg p-2 text-black/35 transition hover:bg-red-500/10 hover:text-red-500 dark:text-white/30 dark:hover:text-red-400"><Trash2 size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Social form modal */}
          {socialFormOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-[3px]">
              <div className="w-full max-w-md rounded-2xl border border-black/[0.10] bg-white p-6 shadow-2xl dark:border-white/[0.10] dark:bg-[#0d1219]">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold">{editingSocial ? "Edit Social Link" : "Add Social Link"}</h3>
                  <button type="button" onClick={() => setSocialFormOpen(false)} className="rounded-lg p-1.5 text-black/40 hover:bg-black/[0.06] dark:text-white/40 dark:hover:bg-white/[0.06]"><X size={16} /></button>
                </div>
                <form onSubmit={handleSocialSave} className="space-y-3">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-black/60 dark:text-white/55">Platform</label>
                    <select value={socialForm.platform} onChange={(e) => setSocialForm((p) => ({ ...p, platform: e.target.value }))} className={inputCls}>
                      {PLATFORMS.map((pl) => <option key={pl} value={pl} className="capitalize">{pl}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-black/60 dark:text-white/55">URL</label>
                    <input required type="url" value={socialForm.url} onChange={(e) => setSocialForm((p) => ({ ...p, url: e.target.value }))} placeholder="https://instagram.com/..." className={inputCls} />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-black/60 dark:text-white/55">Sort Order</label>
                    <input type="number" value={socialForm.sort_order} onChange={(e) => setSocialForm((p) => ({ ...p, sort_order: Number(e.target.value) }))} className={inputCls} />
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-black/[0.08] bg-black/[0.02] px-4 py-3 dark:border-white/[0.08] dark:bg-white/[0.03]">
                    <p className="text-xs font-semibold">Active</p>
                    <button type="button" onClick={() => setSocialForm((p) => ({ ...p, is_active: !p.is_active }))} className={`relative h-6 w-11 rounded-full transition-colors ${socialForm.is_active ? "bg-[#2f8fe6]" : "bg-black/20 dark:bg-white/20"}`}>
                      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${socialForm.is_active ? "translate-x-5" : "translate-x-0.5"}`} />
                    </button>
                  </div>
                  <div className="flex gap-3 pt-1">
                    <button type="button" onClick={() => setSocialFormOpen(false)} className="flex-1 rounded-xl border border-black/[0.10] py-2.5 text-sm font-medium text-black/60 dark:border-white/[0.10] dark:text-white/60">Cancel</button>
                    <button type="submit" disabled={socialSaving} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#2f8fe6] py-2.5 text-sm font-semibold text-white disabled:opacity-60">
                      {socialSaving && <Loader2 size={13} className="animate-spin" />}
                      {editingSocial ? "Save" : "Add"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Delete social confirm */}
          {deletingSocialId !== null && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-[3px]">
              <div className="w-full max-w-sm rounded-2xl border border-black/[0.10] bg-white p-6 shadow-2xl dark:border-white/[0.10] dark:bg-[#0d1219]">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-500/10 text-red-500"><Trash2 size={20} /></div>
                <h3 className="mt-3 text-base font-semibold">Delete social link?</h3>
                <p className="mt-1.5 text-sm text-black/45 dark:text-white/40">This cannot be undone.</p>
                <div className="mt-5 flex gap-3">
                  <button type="button" onClick={() => setDeletingSocialId(null)} className="flex-1 rounded-xl border border-black/[0.10] py-2.5 text-sm font-medium text-black/60 dark:border-white/[0.10] dark:text-white/60">Cancel</button>
                  <button type="button" onClick={() => handleDeleteSocial(deletingSocialId)} className="flex-1 rounded-xl bg-red-500 py-2.5 text-sm font-semibold text-white hover:bg-red-600">Delete</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── TAB: Footer Menus ── */}
      {activeTab === "Footer Menus" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-black/45 dark:text-white/40">{menuData?.length ?? 0} menu items</p>
            <button
              type="button"
              onClick={() => { setEditingMenu(null); setMenuForm({ title: "", label: "", url: "", is_active: true, sort_order: (menuData?.length ?? 0) + 1 }); setMenuFormOpen(true); }}
              className="flex items-center gap-2 rounded-xl bg-[#2f8fe6] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#3d9bf0]"
            >
              <Plus size={15} /> Add Item
            </button>
          </div>

          {menuLoading && (
            <div className="flex items-center justify-center gap-2 py-12 text-sm text-black/40 dark:text-white/35">
              <Loader2 size={18} className="animate-spin" /> Loading...
            </div>
          )}

          {!menuLoading && Object.keys(groupedMenus).length === 0 && (
            <div className="rounded-2xl border border-black/[0.07] bg-white py-12 text-center text-sm text-black/40 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white/35">No menu items yet.</div>
          )}

          {!menuLoading && Object.entries(groupedMenus).map(([groupTitle, items]) => (
            <div key={groupTitle} className="rounded-2xl border border-black/[0.07] bg-white dark:border-white/[0.08] dark:bg-white/[0.04]">
              <div className="border-b border-black/[0.06] px-5 py-3 dark:border-white/[0.07]">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-black/40 dark:text-white/35">{groupTitle}</p>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-black/[0.05] dark:border-white/[0.06]">
                    {["Label", "URL", "Order", "Status", "Actions"].map((h) => (
                      <th key={h} className="px-5 py-2.5 text-left text-[10px] font-bold uppercase tracking-[0.14em] text-black/30 dark:text-white/25">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {items.sort((a, b) => a.sort_order - b.sort_order).map((menu, i) => (
                    <tr key={menu.id} className={`transition hover:bg-black/[0.015] dark:hover:bg-white/[0.025] ${i !== items.length - 1 ? "border-b border-black/[0.04] dark:border-white/[0.05]" : ""}`}>
                      <td className="px-5 py-3 font-medium">{menu.label}</td>
                      <td className="max-w-[160px] px-5 py-3">
                        <code className="truncate block rounded bg-black/[0.04] px-2 py-0.5 text-xs text-black/50 dark:bg-white/[0.06] dark:text-white/45">{menu.url}</code>
                      </td>
                      <td className="px-5 py-3 text-xs text-black/45 dark:text-white/40">{menu.sort_order}</td>
                      <td className="px-5 py-3">
                        <button type="button" onClick={() => handleToggleMenu(menu)} className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold transition ${menu.is_active ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-black/[0.05] text-black/40 dark:bg-white/[0.06] dark:text-white/35"}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${menu.is_active ? "bg-emerald-500" : "bg-black/25 dark:bg-white/25"}`} />
                          {menu.is_active ? "Active" : "Inactive"}
                        </button>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-1">
                          <button type="button" onClick={() => { setEditingMenu(menu); setMenuForm({ title: menu.title, label: menu.label, url: menu.url, is_active: menu.is_active, sort_order: menu.sort_order }); setMenuFormOpen(true); }} className="rounded-lg p-2 text-black/35 transition hover:bg-[#2f8fe6]/10 hover:text-[#2f8fe6] dark:text-white/30 dark:hover:text-[#58adff]"><Edit2 size={14} /></button>
                          <button type="button" onClick={() => setDeletingMenuId(menu.id)} className="rounded-lg p-2 text-black/35 transition hover:bg-red-500/10 hover:text-red-500 dark:text-white/30 dark:hover:text-red-400"><Trash2 size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}

          {/* Menu form modal */}
          {menuFormOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-[3px]">
              <div className="w-full max-w-md rounded-2xl border border-black/[0.10] bg-white p-6 shadow-2xl dark:border-white/[0.10] dark:bg-[#0d1219]">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold">{editingMenu ? "Edit Menu Item" : "Add Menu Item"}</h3>
                  <button type="button" onClick={() => setMenuFormOpen(false)} className="rounded-lg p-1.5 text-black/40 hover:bg-black/[0.06] dark:text-white/40 dark:hover:bg-white/[0.06]"><X size={16} /></button>
                </div>
                <form onSubmit={handleMenuSave} className="space-y-3">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-black/60 dark:text-white/55">Group Title <span className="text-[10px] font-normal text-black/35">(column heading)</span></label>
                    <input required value={menuForm.title} onChange={(e) => setMenuForm((p) => ({ ...p, title: e.target.value }))} placeholder="e.g. Company" className={inputCls} />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-black/60 dark:text-white/55">Label</label>
                    <input required value={menuForm.label} onChange={(e) => setMenuForm((p) => ({ ...p, label: e.target.value }))} placeholder="e.g. About Us" className={inputCls} />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-black/60 dark:text-white/55">URL</label>
                    <input required value={menuForm.url} onChange={(e) => setMenuForm((p) => ({ ...p, url: e.target.value }))} placeholder="/about or https://..." className={inputCls} />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-black/60 dark:text-white/55">Sort Order</label>
                    <input type="number" value={menuForm.sort_order} onChange={(e) => setMenuForm((p) => ({ ...p, sort_order: Number(e.target.value) }))} className={inputCls} />
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-black/[0.08] bg-black/[0.02] px-4 py-3 dark:border-white/[0.08] dark:bg-white/[0.03]">
                    <p className="text-xs font-semibold">Active</p>
                    <button type="button" onClick={() => setMenuForm((p) => ({ ...p, is_active: !p.is_active }))} className={`relative h-6 w-11 rounded-full transition-colors ${menuForm.is_active ? "bg-[#2f8fe6]" : "bg-black/20 dark:bg-white/20"}`}>
                      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${menuForm.is_active ? "translate-x-5" : "translate-x-0.5"}`} />
                    </button>
                  </div>
                  <div className="flex gap-3 pt-1">
                    <button type="button" onClick={() => setMenuFormOpen(false)} className="flex-1 rounded-xl border border-black/[0.10] py-2.5 text-sm font-medium text-black/60 dark:border-white/[0.10] dark:text-white/60">Cancel</button>
                    <button type="submit" disabled={menuSaving} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#2f8fe6] py-2.5 text-sm font-semibold text-white disabled:opacity-60">
                      {menuSaving && <Loader2 size={13} className="animate-spin" />}
                      {editingMenu ? "Save" : "Add"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Delete menu confirm */}
          {deletingMenuId !== null && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-[3px]">
              <div className="w-full max-w-sm rounded-2xl border border-black/[0.10] bg-white p-6 shadow-2xl dark:border-white/[0.10] dark:bg-[#0d1219]">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-500/10 text-red-500"><Trash2 size={20} /></div>
                <h3 className="mt-3 text-base font-semibold">Delete menu item?</h3>
                <p className="mt-1.5 text-sm text-black/45 dark:text-white/40">This cannot be undone.</p>
                <div className="mt-5 flex gap-3">
                  <button type="button" onClick={() => setDeletingMenuId(null)} className="flex-1 rounded-xl border border-black/[0.10] py-2.5 text-sm font-medium text-black/60 dark:border-white/[0.10] dark:text-white/60">Cancel</button>
                  <button type="button" onClick={() => handleDeleteMenu(deletingMenuId)} className="flex-1 rounded-xl bg-red-500 py-2.5 text-sm font-semibold text-white hover:bg-red-600">Delete</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
