import { promises as fs } from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');
const projectsFile = path.join(dataDir, 'projects.json');
const profileFile = path.join(dataDir, 'profile.json');

async function readJson(file, fallback) {
  try {
    const raw = await fs.readFile(file, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    if (err.code === 'ENOENT') return fallback;
    throw err;
  }
}

export const PROFILE_SECTIONS = ['hero', 'about', 'stats', 'skills', 'experience', 'projectsSection', 'contact', 'nav', 'seo'];

export async function getProfile() {
  return readJson(profileFile, {});
}

export async function getSection(section) {
  if (!PROFILE_SECTIONS.includes(section)) return null;
  const profile = await getProfile();
  return profile[section] ?? null;
}

export async function updateSection(section, data) {
  if (!PROFILE_SECTIONS.includes(section)) {
    throw new Error(`Unknown section: ${section}`);
  }
  const profile = await getProfile();
  profile[section] = data;
  await fs.writeFile(profileFile, JSON.stringify(profile, null, 2) + '\n', 'utf8');
  return profile[section];
}

export async function getProjects() {
  return readJson(projectsFile, []);
}

export async function getProject(slug) {
  const all = await getProjects();
  return all.find((p) => p.slug === slug) || null;
}

export async function saveProjects(list) {
  await fs.writeFile(projectsFile, JSON.stringify(list, null, 2) + '\n', 'utf8');
}

export function slugify(str) {
  return String(str)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Create or update a project keyed by slug. `originalSlug` lets the CMS rename.
export async function upsertProject(data, originalSlug) {
  const list = await getProjects();
  const slug = data.slug || slugify(data.name);
  const clean = { ...data, slug };
  const key = originalSlug || slug;
  const idx = list.findIndex((p) => p.slug === key);
  if (idx === -1) {
    list.push(clean);
  } else {
    list[idx] = clean;
  }
  await saveProjects(list);
  return clean;
}

export async function deleteProject(slug) {
  const list = await getProjects();
  const next = list.filter((p) => p.slug !== slug);
  await saveProjects(next);
  return next.length !== list.length;
}
