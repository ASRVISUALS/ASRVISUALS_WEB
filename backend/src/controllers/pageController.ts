import { Request, Response } from 'express'
import Page from '../models/Page'

// Get all pages
export const getPages = async (req: Request, res: Response) => {
  try {
    const { status, limit, sort } = req.query
    
    let query: any = {}
    if (status) query.status = status
    
    const pages = await Page.find(query)
      .populate('author', 'name email')
      .sort(sort ? { [sort as string]: -1 } : { updatedAt: -1 })
      .limit(limit ? parseInt(limit as string) : 100)
    
    res.json({
      success: true,
      data: pages,
      count: pages.length
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching pages'
    })
  }
}

// Get single page
export const getPage = async (req: Request, res: Response) => {
  try {
    const page = await Page.findById(req.params.id).populate('author', 'name email')
    
    if (!page) {
      return res.status(404).json({
        success: false,
        message: 'Page not found'
      })
    }
    
    res.json({
      success: true,
      data: page
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching page'
    })
  }
}

// Get page by slug (public)
export const getPageBySlug = async (req: Request, res: Response) => {
  try {
    const page = await Page.findOne({ 
      slug: req.params.slug,
      status: 'published'
    }).populate('author', 'name email')
    
    if (!page) {
      return res.status(404).json({
        success: false,
        message: 'Page not found'
      })
    }
    
    res.json({
      success: true,
      data: page
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching page'
    })
  }
}

// Create page
export const createPage = async (req: Request, res: Response) => {
  try {
    const pageData = {
      ...req.body,
      author: (req as any).user.id
    }
    
    const page = await Page.create(pageData)
    
    res.status(201).json({
      success: true,
      data: page,
      message: 'Page created successfully'
    })
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'A page with this slug already exists'
      })
    }
    res.status(500).json({
      success: false,
      message: 'Error creating page'
    })
  }
}

// Update page
export const updatePage = async (req: Request, res: Response) => {
  try {
    const page = await Page.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    
    if (!page) {
      return res.status(404).json({
        success: false,
        message: 'Page not found'
      })
    }
    
    res.json({
      success: true,
      data: page,
      message: 'Page updated successfully'
    })
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'A page with this slug already exists'
      })
    }
    res.status(500).json({
      success: false,
      message: 'Error updating page'
    })
  }
}

// Delete page
export const deletePage = async (req: Request, res: Response) => {
  try {
    const page = await Page.findByIdAndDelete(req.params.id)
    
    if (!page) {
      return res.status(404).json({
        success: false,
        message: 'Page not found'
      })
    }
    
    res.json({
      success: true,
      message: 'Page deleted successfully'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting page'
    })
  }
}

// Duplicate page
export const duplicatePage = async (req: Request, res: Response) => {
  try {
    const originalPage = await Page.findById(req.params.id)
    
    if (!originalPage) {
      return res.status(404).json({
        success: false,
        message: 'Page not found'
      })
    }
    
    const pageData = originalPage.toObject()
    const { _id, createdAt, updatedAt, ...cleanData } = pageData as any
    
    cleanData.title += ' (Copy)'
    cleanData.slug += '-copy-' + Date.now()
    cleanData.status = 'draft'
    cleanData.author = (req as any).user.id
    
    const duplicatedPage = await Page.create(cleanData)
    
    res.status(201).json({
      success: true,
      data: duplicatedPage,
      message: 'Page duplicated successfully'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error duplicating page'
    })
  }
}

// Bulk delete pages
export const bulkDeletePages = async (req: Request, res: Response) => {
  try {
    const { ids } = req.body
    
    if (!ids || !Array.isArray(ids)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid page IDs'
      })
    }
    
    await Page.deleteMany({ _id: { $in: ids } })
    
    res.json({
      success: true,
      message: `${ids.length} page(s) deleted successfully`
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting pages'
    })
  }
}
