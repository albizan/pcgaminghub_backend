import Joi from "@hapi/joi";

const cpuSchema = Joi.object({
  asin: Joi.string().length(10).required(),
  label: Joi.string().min(5).required(),
});
const moboSchema = Joi.object({
  asin: Joi.string().length(10).required(),
  label: Joi.string().min(5).required(),
});
const psuSchema = Joi.object({
  asin: Joi.string().length(10).required(),
  label: Joi.string().min(5).required(),
});
const caseSchema = Joi.object({
  asin: Joi.string().length(10).required(),
  label: Joi.string().min(5).required(),
});
const ramSchema = Joi.object({
  asin: Joi.string().length(10).required(),
  label: Joi.string().min(5).required(),
});
const gpuSchema = Joi.object({
  asin: Joi.string().length(10),
  label: Joi.string().min(5).allow(""),
});
const ssdSchema = Joi.object({
  asin: Joi.string().length(10).allow(""),
  label: Joi.string().min(5).allow(""),
});
const hddSchema = Joi.object({
  asin: Joi.string().length(10).allow(""),
  label: Joi.string().min(5).allow(""),
});

const coolerSchema = Joi.object({
  asin: Joi.string().length(10).allow(""),
  label: Joi.string().min(5).allow(""),
});

export const createBuildSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().integer().min(400).required(),
  cpuBrand: Joi.string().valid("AMD", "INTEL").required(),
  gpuBrand: Joi.string().valid("AMD", "NVIDIA").allow(""),
  imageUrl: Joi.string().uri().optional().allow(""),
  subTitle: Joi.string().min(10).optional().allow(""),
  description: Joi.string().min(50).optional().allow(""),
  CPU: cpuSchema,
  "Scheda Madre": moboSchema,
  Alimentatore: psuSchema,
  Case: caseSchema,
  RAM: ramSchema,
  GPU: gpuSchema,
  SSD: ssdSchema,
  HDD: hddSchema,
  Dissipatore: coolerSchema,
});
