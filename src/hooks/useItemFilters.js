import { useMemo } from "react";

export const useItemFilters = (
  items, searchTerm, selectedCategory, selectedBrand, selectedTeam, priceRange, sortBy
) => {
  const filteredAndSortedItems = useMemo(() => {
    let filtered = items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "" || item.category === selectedCategory;
      const matchesBrand = selectedBrand === "" || item.brand === selectedBrand;
      const matchesTeam = selectedTeam === "" || item.team === selectedTeam;
      const matchesPrice = (priceRange.min === "" || item.price >= parseFloat(priceRange.min)) &&
                          (priceRange.max === "" || item.price <= parseFloat(priceRange.max));
      
      return matchesSearch && matchesCategory && matchesBrand && matchesTeam && matchesPrice;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name":
          return a.name.localeCompare(b.name);
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        default:
          return 0;
      }
    });

    return filtered;
  }, [items, searchTerm, selectedCategory, selectedBrand, selectedTeam, priceRange, sortBy]);

  const filterOptions = useMemo(() => {
    const categories = [...new Set(items.map(item => item.category))].sort();
    const brands = [...new Set(items.map(item => item.brand))].sort();
    const teams = [...new Set(items.map(item => item.team).filter(Boolean))].sort();
    return { categories, brands, teams };
  }, [items]);

  return { filteredAndSortedItems, filterOptions };
};
