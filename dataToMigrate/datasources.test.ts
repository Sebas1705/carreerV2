import { expect, test } from 'vitest';

import projects from '@/data/datasources/projectsData.json';
import personal from '@/data/datasources/personalInfoData.json';
import skills from '@/data/datasources/skillsData.json';
import softskills from '@/data/datasources/softSkillsData.json';
import courses from '@/data/datasources/coursesData.json';
import academic from '@/data/datasources/academicExperiencesData.json';
import work from '@/data/datasources/workExperiencesData.json';

test('projectsData.json basic shape', () => {
    expect(Array.isArray(projects)).toBe(true);
    expect(projects.length).toBeGreaterThan(0);
    const p = projects[0];
    expect(p).toHaveProperty('id');
    expect(p).toHaveProperty('title');
    expect(p).toHaveProperty('description');
});

test('personalInfoData.json contains name and email', () => {
    expect(personal).toHaveProperty('name');
    expect(personal).toHaveProperty('email');
    expect(typeof personal.email).toBe('string');
});

test('skills and softskills arrays present', () => {
    expect(Array.isArray(skills)).toBe(true);
    expect(Array.isArray(softskills)).toBe(true);
    expect(skills.length).toBeGreaterThan(0);
    expect(softskills.length).toBeGreaterThan(0);
});

test('courses, academic and work datasources are arrays', () => {
    expect(Array.isArray(courses)).toBe(true);
    expect(Array.isArray(academic)).toBe(true);
    expect(Array.isArray(work)).toBe(true);
});

test('projects entries have expected fields and types', () => {
    const p = projects[0];
    expect(Array.isArray(p.technologies)).toBe(true);
    expect(typeof p.startDate).toBe('string');
    // startDate should be an ISO-like date (YYYY-MM-DD)
    expect(/^\d{4}-\d{2}-\d{2}$/.test(p.startDate)).toBe(true);
    expect(['work', 'academic', 'personal']).toContain(p.type);
});

test('personal info contains social links and valid email', () => {
    expect(personal).toHaveProperty('socialLinks');
    expect(typeof personal.socialLinks.github).toBe('string');
    expect(personal.email).toContain('@');
});
