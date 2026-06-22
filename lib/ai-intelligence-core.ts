export type IntelligenceTask='advisor'|'content'|'competitor-analysis'|'market-positioning'|'growth-opportunity';

export type IntelligenceContext={task:IntelligenceTask;market?:string;buyerType?:string;application?:string;evidenceAvailable?:boolean;regulatoryDataVerified?:boolean};

export const AI_INTELLIGENCE_CORE={
  version:'1.0.0',
  identity:{
    category:'Aesthetic Medical Technology Systems',
    positioning:'A structured aesthetic technology system provider integrating multiple clinical treatment modalities into application-driven solutions.',
    role:'A structured hybrid system provider bridging manufacturing capabilities and clinical solution ecosystems.',
    statement:'NEWME MEDTECH participates in the global transition from fragmented device supply toward structured, application-based aesthetic technology systems that help professional partners evaluate technologies, platforms, and workflows in context.',
    hierarchy:['System','Technology','Product','Application'],
  },
  industry:{
    evolution:{from:['single-function devices','fragmented catalogs','factory-led supply','specification competition','price-led selection'],to:['application systems','multi-technology portfolios','workflow integration','evidence-aware selection','outcome-oriented planning']},
    layers:['Market Demand','Clinical Application','Application System','Physical Technology','Professional Platform','Professional Enablement','Clinical and Market Governance'],
    relationships:[['Market Demand','creates demand for','Clinical Application'],['Clinical Application','is organized within','Application System'],['Application System','uses','Physical Technology'],['Physical Technology','is implemented by','Professional Platform'],['Professional Platform','supports','Clinical Application'],['Professional Enablement','operationalizes','Application System'],['Clinical and Market Governance','constrains','Professional Platform']],
    companyRoles:{traditionalOEM:'Product-centric manufacturing and supply',distributor:'Portfolio-centric market access and sales',premiumBrand:'Solution-centric branded technology and workflow',systemProvider:'Application structure, technology integration, platform selection, and enablement'},
  },
  positioning:{
    required:['Begin with clinical application and workflow context','Explain the physical mechanism before promoting a product','Show every product inside its parent system','Emphasize structured selection, professional support, and market relevance','Treat regulatory availability as product- and market-specific'],
    prohibited:['flat product catalog','price-led or factory-direct identity','one-machine-solves-everything claims','unsupported premium, performance, safety, or outcome claims','aggressive urgency','borrowed credibility from unrelated brands'],
    audience:{clinic:'Applications, workflow, usability, documentation, and support',distributor:'Portfolio logic, territory fit, training, documentation, and service',beautyProfessional:'Scope-appropriate platforms, training, workflow, and local rules',endUser:'Education only; direct clinical decisions to qualified professionals'},
  },
  evidence:{
    sourcePriority:['official company and product pages','official regulatory databases and certificates','official manuals and technical documents','peer-reviewed publications','clearly identified secondary distributor sources'],
    requiredMetadata:['source URL','publisher','capture date','market','claim','evidence type'],
    unknownRule:'If a fact cannot be verified, label it unknown. Missing evidence is not evidence of absence.',
    neverInvent:['certifications or regulatory status','clinical evidence','indications','outcomes or efficacy numbers','specifications','prices','warranty','lead time','market availability','competitor capabilities'],
  },
  competitorAnalysis:{
    classification:['product-centric','modality-centric','solution-centric','system-integrated'],
    dimensions:['company role','information architecture','technology coverage','application coverage','product-to-system relationships','workflow and training support','regulatory evidence','clinical evidence','service and distributor support','content and SEO ownership','conversion path','claim intensity'],
    scoring:{min:0,max:5,rule:'Keep evidence strength separate from capability. Unknown evidence does not equal zero capability.'},
    output:['competitor','market','classification','observations','scores','evidence','unknowns','newme implications','reviewed at'],
  },
  growthEngine:{
    loop:['collect','classify','map','prioritize','generate draft','human review','publish','measure'],
    inputs:['CMS relationship graph','search and landing-page performance','consented conversion events','AI assistant intent','qualified lead fields','verified regulatory availability','approved competitor evidence'],
    scoring:{demandSignal:0.25,commercialIntent:0.25,systemRelevance:0.20,evidenceStrength:0.15,marketAvailability:0.15},
    intentStages:['explore','evaluate','configure','inquire'],
    outputs:['content briefs','relationship-valid internal links','SEO topic clusters','explainable lead-priority suggestions','market-page recommendations','comparison drafts','missing-data alerts','conversion experiments'],
    metrics:['qualified inquiry rate','system-page conversion','application-to-technology progression','documentation requests','distributor-qualified leads','system/application organic visibility','content-assisted conversion','regulatory-content error rate'],
  },
  conversionFeedback:{
    funnel:['page_view','section_view','cta_click','inquiry_start','lead_submit'],
    alternateConversions:['whatsapp_click','chat_open'],
    bottlenecks:{earlyDropOff:'Most sessions leave before reaching 50% depth',lowCtaEngagement:'Page views do not progress to a conversion CTA',formFriction:'Inquiry starts do not progress to lead submission',channelMismatch:'Visitors prefer a different conversion channel'},
    thresholds:{minimumSessions:20,highEarlyDropOffRate:0.65,lowCtaRate:0.03,lowFormCompletionRate:0.35,strongWhatsAppShare:0.6},
    safeDynamicActions:['prioritize the preferred CTA','clarify first-screen application relevance','shorten the path to inquiry','adjust content priority by entity demand'],
    prohibitedDynamicActions:['auto-publish medical or regulatory claims','personalize using sensitive traits','store form values in analytics','use deceptive urgency','automatically contact a lead'],
    feedbackRule:'Conversion insights may change content and CTA priorities, but all factual, clinical, regulatory, and published copy changes require human review.',
  },
  behavior:{
    voice:['professional international B2B English','clear and restrained','clinically relevant','plain explanations of mechanisms'],
    requiredFlow:['identify application need','identify market and buyer type','map to system','explain technology','present suitable product options','confirm documentation and configuration','invite inquiry'],
    prohibitedLanguage:['revolutionary','miracle','best','guaranteed','risk-free','permanent','pain-free','zero downtime'],
    trademarkTerms:{use:['Hydra Beauty','hydrodermabrasion','EMS SHAPE','electromagnetic muscle stimulation'],avoid:['HydraFacial','EMSCULPT']},
    regulatoryNote:'Regulatory status, intended use, and available configurations vary by product and market and must be confirmed with NEWME MEDTECH.',
    outcomesNote:'Outcomes vary by client, indication, protocol, operator, product configuration, and intended use.',
    internalLinkRule:'Create internal links only from explicit CMS entity relationships.',
    publishingRule:'AI output remains draft until human review. Regulatory, clinical, comparative, and market-specific claims require approval.',
  },
} as const;

export function evaluateIntelligenceContext(context:IntelligenceContext){
  const warnings:string[]=[];
  if(!context.market)warnings.push('Market context is missing.');
  if(!context.application&&context.task!=='competitor-analysis')warnings.push('Clinical application context is missing.');
  if(context.task==='competitor-analysis'&&!context.evidenceAvailable)warnings.push('Competitor conclusions must remain unknown until attributable evidence is supplied.');
  if(context.regulatoryDataVerified===false)warnings.push(AI_INTELLIGENCE_CORE.behavior.regulatoryNote);
  const nextAction=context.task==='competitor-analysis'?'collect and classify attributable evidence':context.task==='growth-opportunity'?'map signals to CMS entities and calculate an explainable opportunity score':'map the application to a system, technology, and supported product';
  return {allowed:true,requiresHumanReview:true,warnings,nextAction};
}

export function calculateGrowthOpportunity(input:{demandSignal:number;commercialIntent:number;systemRelevance:number;evidenceStrength:number;marketAvailability:number}){
  const clamp=(value:number)=>Math.min(100,Math.max(0,value));
  const weights=AI_INTELLIGENCE_CORE.growthEngine.scoring;
  return Math.round(clamp(input.demandSignal)*weights.demandSignal+clamp(input.commercialIntent)*weights.commercialIntent+clamp(input.systemRelevance)*weights.systemRelevance+clamp(input.evidenceStrength)*weights.evidenceStrength+clamp(input.marketAvailability)*weights.marketAvailability);
}

export type ConversionMetrics={sessions:number;pageViews:number;ctaClicks:number;inquiryStarts:number;leadSubmits:number;whatsappClicks:number;chatOpens:number;earlyExits:number};
export function evaluateConversionFeedback(metrics:ConversionMetrics){
  const core=AI_INTELLIGENCE_CORE.conversionFeedback;const divide=(a:number,b:number)=>b?Math.min(1,a/b):0;
  const rates={cta:divide(metrics.ctaClicks,metrics.sessions),formCompletion:divide(metrics.leadSubmits,metrics.inquiryStarts),earlyDropOff:divide(metrics.earlyExits,metrics.sessions),whatsappShare:divide(metrics.whatsappClicks,metrics.whatsappClicks+metrics.leadSubmits)};
  const bottlenecks:string[]=[];
  if(metrics.sessions>=core.thresholds.minimumSessions&&rates.earlyDropOff>=core.thresholds.highEarlyDropOffRate)bottlenecks.push('early-drop-off');
  if(metrics.sessions>=core.thresholds.minimumSessions&&rates.cta<core.thresholds.lowCtaRate)bottlenecks.push('low-cta-engagement');
  if(metrics.inquiryStarts>=5&&rates.formCompletion<core.thresholds.lowFormCompletionRate)bottlenecks.push('form-friction');
  if(metrics.whatsappClicks+metrics.leadSubmits>=5&&rates.whatsappShare>=core.thresholds.strongWhatsAppShare)bottlenecks.push('whatsapp-preference');
  const preferredCta=bottlenecks.includes('whatsapp-preference')?'whatsapp':bottlenecks.includes('form-friction')?'chat':'inquiry';
  const contentAction=bottlenecks.includes('early-drop-off')?'Clarify the application and system relevance in the first screen.':bottlenecks.includes('low-cta-engagement')?'Strengthen the connection between educational content and the next system-level action.':'Maintain the current information hierarchy and continue measurement.';
  const conversionAction=preferredCta==='whatsapp'?'Prioritize WhatsApp as the visible secondary conversion path.':preferredCta==='chat'?'Offer AI qualification before the full inquiry form.':'Keep the structured inquiry as the primary conversion path.';
  return {coreVersion:AI_INTELLIGENCE_CORE.version,rates,bottlenecks,preferredCta,contentAction,conversionAction,requiresHumanReview:true};
}

export function buildAIAdvisorPrompt(knowledge:unknown){
  const core=AI_INTELLIGENCE_CORE;
  return `You are Nova, the concise B2B advisor for NEWME MEDTECH. Category: ${core.identity.category}. Position: ${core.identity.positioning} Follow this hierarchy: ${core.identity.hierarchy.join(' → ')}. Required decision flow: ${core.behavior.requiredFlow.join('; ')}. Use ${core.behavior.voice.join(', ')}. Never invent ${core.evidence.neverInvent.join(', ')}. Avoid these terms: ${[...core.behavior.prohibitedLanguage,...core.behavior.trademarkTerms.avoid].join(', ')}. ${core.behavior.regulatoryNote} ${core.behavior.outcomesNote} Ask one or two qualification questions at a time about country, business type, application, and budget. When inquiry intent is clear, request name, email or WhatsApp, country, company, and system/product interest. Keep replies under 110 words. Knowledge: ${JSON.stringify(knowledge)}`;
}

export function buildAIContentPrompt(input:{contentType:'system'|'technology'|'product'|'application'|'article';entity:unknown;relations:unknown;market?:string}){
  const core=AI_INTELLIGENCE_CORE;
  return `Generate a CMS draft for NEWME MEDTECH. Content type: ${input.contentType}. Market: ${input.market||'global'}. Position: ${core.identity.positioning} Hierarchy: ${core.identity.hierarchy.join(' → ')}. Required positioning rules: ${core.positioning.required.join('; ')}. Prohibited positioning: ${core.positioning.prohibited.join('; ')}. Voice: ${core.behavior.voice.join(', ')}. Never invent: ${core.evidence.neverInvent.join(', ')}. ${core.behavior.regulatoryNote} ${core.behavior.outcomesNote} Use internal links only from the supplied relationships. Return valid JSON with title, eyebrow, summary, sections, key_points, faq, internal_links, seo, regulatory_note, and clinical_disclaimer. Entity: ${JSON.stringify(input.entity)}. Relationships: ${JSON.stringify(input.relations)}`;
}

export const globalNarrative={
  category:AI_INTELLIGENCE_CORE.identity.category,
  positioning:AI_INTELLIGENCE_CORE.identity.positioning,
  role:AI_INTELLIGENCE_CORE.identity.role,
  statement:AI_INTELLIGENCE_CORE.identity.statement,
  marketShift:AI_INTELLIGENCE_CORE.industry.evolution,
  functions:['Organizes technologies by clinical application','Connects professional platforms to structured systems','Supports evidence-aware technology selection','Bridges manufacturing and clinical application needs'],
  technologySystems:['laser systems','RF systems','RF microneedling systems','LED phototherapy systems','body contouring systems','skin-care systems','focused ultrasound systems'],
  contentPrinciples:['system thinking','application-based structure','technology integration logic','clinical decision frameworks'],
  avoidPositioning:AI_INTELLIGENCE_CORE.positioning.prohibited,
} as const;
