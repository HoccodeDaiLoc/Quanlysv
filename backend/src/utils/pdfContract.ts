import PDFDocument from 'pdfkit';
import fs from 'fs';
import { size } from 'pdfkit/js/page';

const doc = new PDFDocument({size: 'A4'});
